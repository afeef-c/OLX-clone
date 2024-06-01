// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {toast} from "react-toastify";
import { addDoc, collection, getFirestore,getDocs, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


const signup = async (name, email, phone,password)=>{
  console.log(name,email)
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user;
    await addDoc(collection(db, "users"),{
      uid:user.uid,
      name,
      authProvider : "local",
      email,
      phone,
    });
    return true
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    return false
  }

}


const login  = async (email, password) => {
  try{
    await signInWithEmailAndPassword(auth, email, password)
    return true

  }catch(error){
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
    return false

  }
}

const logout = () => {
  signOut(auth);
}

const imageUpload = async (image, name, category, price, user) => {
  try {
    // Logging the start of the upload process
    console.log("Uploading image:", image.name);

    // Upload image to Firebase Storage
    const storageRef = ref(storage, `/images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);

    // Get download URL for the uploaded image
    const url = await getDownloadURL(snapshot.ref);
    console.log("Image uploaded, URL:", url);

    // Add product data to Firestore
    await addDoc(collection(db, 'products'), {
      name,
      category,
      price,
      imageUrl: url,
      userId: user.uid,
      createdAt: new Date().toDateString() // For Firestore's Timestamp, use: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("Product data added to Firestore");

    return true;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error(error.message || error.code); // Improved error messaging
    return false;
  }
};

const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const allProducts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return allProducts;
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(' '))
    return [];
  }
};

const viewUser = async (userId) => {
  console.log('userId:', userId);
  try {
      const querySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', userId)));
      const user = querySnapshot.docs.map(doc => doc.data());
      return user
      
  } catch (error) {
      console.error('Error fetching user details:', error);
  }
};





export {auth, db, login, signup, logout,imageUpload,getProducts, viewUser};
