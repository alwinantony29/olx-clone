import React,{useEffect,useContext} from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import  Login  from "./Pages/Login";
import Home from "./Pages/Home";
import View from './Pages/ViewPost'
import Create from "./Pages/Create";
import { Routes } from "react-router-dom";
import { FirebaseContext, authContext } from "./store/Context";
import { onAuthStateChanged } from "firebase/auth";
import {  auth} from "./firebase/config";
function App() {
  const {user,setUser}=useContext(authContext)
  useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user)
      } else {
        // User is signed out
        // ...
      }
    });
  })
  return (
    <div>
       <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}>
        </Route>
        <Route path='/signup' element={<Signup/>}>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/create" element={<Create/>}></Route>
        <Route path="/view" element={<View/>}></Route>
      </Routes>
      </Router>

    </div>
  );
}

export default App;
