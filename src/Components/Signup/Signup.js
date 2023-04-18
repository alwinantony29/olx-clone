import { useState,React,useContext, } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
const {firebase}=useContext(FirebaseContext)
const navigate=useNavigate()
const auth=getAuth();

  const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log(userName,email,phone,password);
    createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      //signed in
      updateProfile(auth.currentUser,{displayName:userName}).then(()=>{
        console.log('displayname updated');
      })
      const user=userCredential.user;
      console.log(user);
      navigate('/')
    
    }).catch((error)=>{
      const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input onChange={(e)=>{setUserName(e.target.value)}}
          value={userName}
            className="input"
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
            className="input"
            type="email"
            id="email"
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input value={phone}
          onChange={(e)=>{setPhone(e.target.value)}}
            className="input"
            type="number"
            id="lname"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
            className="input"
            type="password"
            id="password"
            name="password"
            
          />
          <br />
          <br />
          <button  >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
