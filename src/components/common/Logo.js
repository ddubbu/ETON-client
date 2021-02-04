import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/common.css';
export default function Logo(){
  return (
    <section className="logo">
      <Link to="/">
        <img src="./images/logo-ETON-1080.png"></img>
        <span> ETON </span>
      </Link>
    </section>
  )
}