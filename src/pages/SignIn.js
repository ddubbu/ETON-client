import React from 'react';
import '../styles/signin.css';
import Logo from '../components/common/Logo.js'
const SignIn = () => {


  return (
    <section className="signin-wrapper">
      <Logo/>
      <section className="signin-form">
        <p>Log in to ETON</p>
        <input placeholder="Enter email"/>
        <input placeholder="Enter password"/>
        <button> Sign In </button>
        <p>or</p>
        <button>Continue with github 🤖</button>
        <a href="https://www.naver.com">Sign up for an account</a>
      </section>
    </section>
  )
}

export default SignIn; 