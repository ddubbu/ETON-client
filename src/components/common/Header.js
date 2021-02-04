import React from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "./Logo.js";

const Header = () => {
  const history = useHistory();

  return (
    <div className="Header">
      <div>
        {/* <Logo /> */}
      </div>
      <div>여백. 뭐 넣을까?</div>
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
    </div>
  );
};

export default Header;
