import { useState, React, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase/config";
export default function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userName,email,phone,password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //signed in
        updateProfile(auth.currentUser, { displayName: userName }).then(
          async () => {
            console.log("displayname updated", "uid:", userCredential.user.uid);
            try {
              const docRef = await addDoc(collection(db, "users"), {
                id: userCredential.user.uid,
                username: userName,
                phone: phone,
              }).then(() => {
                console.log("data inserted");
                navigate("/login");
              });
              console.log("Document written with ID: ", docRef);
            } catch (e) {
              console.error("Error adding document: ", e);
              console.log(e);
            }
          }
        );
        const user = userCredential.user;
        console.log("usercredentials:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error:", errorCode, errorMessage);
      });
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img alt="logo" width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            className="input"
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input"
            type="email"
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="input"
            type="number"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input"
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
