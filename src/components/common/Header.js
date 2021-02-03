import React, { useState } from 'react';

const Header = () => {

  return (
      <div className = "Header">
          <div className = "logo">
            ETON
          </div>
          <div className = "space">

          </div>
          <div className = "buttonDiv">

            <button 
              className="btn"
            >
                Sign Up
            </button>
            <button className="btn">Login</button>
          </div>
      </div>
  )
}

export default Header; 