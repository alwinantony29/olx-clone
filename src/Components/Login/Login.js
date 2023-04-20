import {React,useState,} from 'react';

import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
 const navigate= useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('this isthat',auth.currentUser.displayName);

    console.log(user.displayName,'signed in',user);
    navigate('/')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
  });
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img alt='logo' width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input value={email}
          onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="email"
            name="email"
            
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
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
