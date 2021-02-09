import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import LogoutDropDown from "../modal/logoutDropDown.js";
import Logo from "./Logo.js";

const Header = ({isLogin, HandleLogout, accessToken}) => {
  const history = useHistory();

  const [showLogoutDropDown, setShowLogoutDropDown] = useState(false); 
  // const logoutContainer = React.createRef();

  const openLogoutDropDown = () => {
    setShowLogoutDropDown(true);
  }

  const closeLogoutDropDown = () => {
    setShowLogoutDropDown(false);
  }

  console.log("HEADER - accessToken : ", accessToken);

  return (
    <div className="Header">
      <Logo />
      {isLogin ? 
      <div className = "logoutDiv">
        <button onClick={openLogoutDropDown}>
          Log out
        </button>
        {showLogoutDropDown && <LogoutDropDown closeLogoutDropDown = {closeLogoutDropDown} HandleLogout = {HandleLogout} accessToken = {accessToken}/>}
      </div>
        :
        <div>
        <button
          onClick={() => {
            history.push("/users/signup");
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            history.push("/users/signin");
          }}
        >
          Log In
        </button>
      </div>
      }
      {/* {showLogoutModal ? 
      <LogoutModal closeLogoutModal = {closeLogoutModal}/>
      : 
      null} */}
    </div>
  );
};

export default Header;
