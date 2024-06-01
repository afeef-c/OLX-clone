import React,{useState } from 'react';
import Logo from '../../assets/olx-logo.png'
import './Signup.css';
import { signup,login } from '../../firebase/Config';
import { useNavigate } from 'react-router-dom';
import spinner from '../../assets/loadingImage.png'



 const Signup=()=> {
 
  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [signState,setSignState]=useState('Sign In')
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  

 
  const handleSubmit=async (e)=>{
      e.preventDefault()
      setLoading(true)
      if(signState==='Sign In'){
          const result=await login(email,password)
          if(result) navigate('/')

      }else{
        const result= await signup(userName,email,phone,password)
        if(result)setSignState('Sign In')
      }
      setLoading(false)
     
  }
  return (
    <>
    {loading? <div className="loading-spinner"><img src={spinner} alt="" /></div>:
    <div>
    <div className="signupParentDiv">
      <img width="200px" height="200px" src={Logo} ></img>
      <form >
        {signState==='Sign Up'?
        <>
        <label htmlFor="fname">Username</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="userName"
          value={userName}
          onChange={(e)=>setUserName(e.target.value)}/>
        <br />
        </>:<></>
}
        <label htmlFor="fname">Email</label>
        <br />
        <input
          className="input"
          type="email"
          id="fname"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
         
        />
       {signState==='Sign Up'?
        <>
         <br />
        <label htmlFor="lname">Phone</label>
        <br />
        <input
          className="input"
          type="number"
          id="lname"
          name="phone"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
         
        />
        </>:<></>
       }
        <br />
        <label htmlFor="lname">Password</label>
        <br />
        <input
          className="input"
          type="password"
          id="lname"
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
         
        />
        <br />
        <br />
        <button onClick={handleSubmit} type='submit'>{signState}</button>
      </form>
      {signState==='Sign In'?<a><span onClick={()=>setSignState('Sign Up')}>Sign Up</span></a>:<a><span onClick={()=>setSignState('Sign In')}>Sign In</span></a>}
    </div>
  </div>
    }
    </>
  );
}

export default Signup;