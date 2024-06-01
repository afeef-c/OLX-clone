import React, {useContext, useEffect, useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import {getProducts} from '../../firebase/Config';
import {PostContext} from '../../store/PostContext';
import {useNavigate} from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)

  const navigate = useNavigate()
  useEffect(()=>{
    const result = getProducts()
    result.then((resp)=>{
      console.log('result:',resp)
      setProducts(resp)
    })
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products?.map((item)=>{
          
          return <div
            className="card"
            onClick={()=>{
              setPostDetails(item)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={item.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {item.price}</p>
              <span className="kilometer"> {item.category} </span>
              <p className="name"> {item.name} </p>
            </div>
            <div className="date">
              <span>{item.createdAt}</span>
            </div>
          </div>  
          })}
          
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products?.map((item)=>{
          
          return<div className="card"
            onClick={()=>{
              setPostDetails(item)
              navigate('/view')
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={item.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {item.price}</p>
              <span className="kilometer"> {item.category} </span>
              <p className="name"> {item.name} </p>
            </div>
            <div className="date">
              <span> {item.createdAt} </span>
            </div>
          </div>
          }
        )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
