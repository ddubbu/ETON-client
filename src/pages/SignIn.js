import React, { useState } from 'react';
import '../styles/signIn.css';
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
        <label>이메일</label>
        <input type="email" onChange={inputHandler} placeholder="Enter email"/>
        <label>비밀번호</label>
        <input type="password" onChange={inputHandler} placeholder="Enter password"/>
        <button onClick={signInHandler}> Log In </button>
        <p>or</p>
        <button>Continue with github 🤖</button>
        <a href="/users/signup">Sign up for an account</a>
      </section>
    </section>
  )
}

export default SignIn; 