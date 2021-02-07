import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "./Logo.js";

const Header = ({isLogin}) => {
  const history = useHistory();

  const handleLogout = () => {
    // axios.
  }

  return (
    <div className="Header">
      <Logo />
      {isLogin ? 
      <button onClick={handleLogout}>
        Log out
      </button>
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
    </div>
  );
};

export default Header;
