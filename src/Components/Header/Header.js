import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { authContext } from '../../store/Context';
import {  auth} from "../../firebase/config";
import {  signOut} from "firebase/auth";
import {  useNavigate } from 'react-router-dom';
function Header() {
const navigate=useNavigate()
  const {user}=useContext(authContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span >{user?`Hey ${user.displayName}`:'Login'}</span>
          <hr />
         
        </div>
        {user &&<button onClick={()=>{
            signOut(auth).then(() => {
              console.log('Sign-out successful');
              navigate('/login')
            }).catch((error) => {
              // An error happened.
            });
          }}>Logout</button>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
