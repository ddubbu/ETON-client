import React, { useState } from 'react';
import '../styles/signin.css';
import Logo from '../components/common/Logo.js'
const SignIn = () => {

  const [ input, setInput ] = useState({
    email : '',
    password: ''
  });

  const inputHandler = (e)=>{
    setInput({
      ... input,
      [e.target.type] : e.target.value
    })
  }

  const signInHandler = (e)=>{
    console.log(input);
  }

  return (
    <section className="signin-wrapper">
      <Logo/>
      <section className="signin-form">
        <p>Log in to ETON</p>
        <input type="email" onChange={inputHandler} placeholder="Enter email"/>
        <input type="password" onChange={inputHandler} placeholder="Enter password"/>
        <button onClick={signInHandler}> Sign In </button>
        <p>or</p>
        <button>Continue with github 🤖</button>
        <a href="https://www.naver.com">Sign up for an account</a>
      </section>
    </section>
  )
}

export default SignIn; 