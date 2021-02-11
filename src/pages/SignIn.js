import React, { useEffect, useState } from 'react';
import '../styles/signIn.css';
import Logo from '../components/common/Logo.js'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const SignIn = (props) => {

	const [input, setInput] = useState({
		email: '',
		password: ''
	});

	// const [isLogin, setLogin] = useState(false);

	const inputHandler = (e) => {
		setInput({
			...input,
			[e.target.type]: e.target.value
		})
	}

	const signInHandler = (e) => {
		axios.post("https://geteton.ga/users/signin/basic",{
		// axios.post("https://geteton.ga/users/signin/basic",{
			email : input.email,
			password : input.password
		},{
			withCredentials : true
		}).then(res => {
			console.log("SIGN IN - res : ", res);
			props.handleLogin(res.data);
			// setLogin(true);
		}).catch(err => {
			console.log("SIGN IN - err : ", err);
		})
	}

	const socialSignUp = () => {
		window.location.assign('https://github.com/login/oauth/authorize?client_id=ba16cbd9921edd657827');
	}

	useEffect(() => {
		console.log("use Effect");
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get("code");
		if (authorizationCode) {
		  getAccessToken(authorizationCode);
		}
	  });

	  const getAccessToken = (authorizationCode) => {
		console.log("getAccessToken!");
		axios.post(
		  "https://geteton.ga/users/signin/github/callback",
		  {
			authorizationCode,
		  },
		  {
			withCredentials: true,
		  }
		)
		.then(res => {
			console.log("res : ", res.data);
			props.handleLogin(res.data);
			// setLogin(true);
		})
		.catch(err => {
			console.log("ERR : ", err);
		})
		}
		;
		

	if(props.isLogin) return <Redirect to = "/" />

	return (
		<section className="signin-wrapper">
			<Logo />
      <section id="signin-form-wrapper">
        <section className="signin-form">
          <label>이메일</label>
          <input type="email" onChange={inputHandler} placeholder="Enter email" />
          <label>비밀번호</label>
          <input type="password" onChange={inputHandler} placeholder="Enter password" />
          <button onClick={signInHandler}> Log In </button>
          <p>or</p>
          <button onClick = {socialSignUp}>Continue with github 🤖</button>
          <a href="/users/signup">Sign up for an account</a>
        </section>
      </section>
		</section>
	)
}

export default SignIn; 