import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo(){
  return (
    <section className="logo">
      <Link to="/">
        <img src= "/logo-ETON-1080.png"></img>
        <span> ETON </span>
      </Link>
    </section>
  )
}