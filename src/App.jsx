//import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import './App.css';
import {useEffect, useContext} from 'react';
import Signup from './Components/Signup/Signup'
import Home from './Pages/Home';
import Create from './Pages/Create'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthContext} from './store/Context';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase/Config';
import View from './Pages/ViewPost'
import Post from './store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext)
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      setUser(user)
    })
  },[])
    
  return (
    
    <div>
      <ToastContainer theme='light' />
      <Post>
        <Router>
          <Routes> 
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/signup' element={<Signup/>} />
            <Route exact path='/create' element={<Create/>} />
            <Route exact path='/view' element={<View/>} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
