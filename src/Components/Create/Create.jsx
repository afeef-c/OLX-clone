import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { imageUpload } from '../../firebase/Config';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Context';

const Create = () => {

  const [name,setName]=useState('')
  const [category,setCategory]=useState('')  
  const [price,setPrice]=useState('')  
  const [image,setImage]=useState(null)  

  const navigate=useNavigate()

  const {user}=useContext(AuthContext)
  const handleSubmit=()=>{
    if(user===null){
      navigate('/signup')
      return
    } 
    const result= imageUpload(image,name,category,price,user)
    if (result){
      
      navigate('/') 
    }

  }

  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
        <h2>Add your product details</h2><br />
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" 
            value={price}
              onChange={(e)=>setPrice(e.target.value)} />
            <br />
          <br />
          <img  width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          
            <br />
            <input type="file"  onChange={(e)=>{setImage(e.target.files[0])}}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </>
  );
};

export default Create;