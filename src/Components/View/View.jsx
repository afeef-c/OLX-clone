import React, {useContext, useEffect, useState} from 'react';

import './View.css';
import {PostContext} from '../../store/PostContext';
import {useNavigate} from 'react-router-dom';
import {viewUser} from '../../firebase/Config';
function View() {
  const [userDtails, setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  const navigate = useNavigate()
  useEffect(()=>{
    const {userId} = postDetails
    const result = viewUser(userId)
    result.then((response)=>{
      setUserDetails(response)
      console.log('second: ',response)
    })
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span> {postDetails.name} </span>
          <p>{ postDetails.category}</p>
          <span> {postDetails.createdAt} </span>
        </div>
        
        {userDtails &&<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDtails[0]?.name}</p>
          <p>{userDtails[0]?.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
