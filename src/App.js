import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
/**
 * ?  =====Import Components=====
 */
import Home from "./Pages/Home";
import { Routes } from "react-router-dom";

function App() {
  return (
    <div>
       <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}>
        </Route>
        <Route path='/signup' element={<Signup/>}>
        </Route>
      </Routes>
      </Router>

    </div>
  );
}

export default App;
