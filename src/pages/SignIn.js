import React, { useState } from 'react';
import '../styles/signIn.css';
import Logo from '../components/common/Logo.js'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const SignIn = (props) => {

	const [input, setInput] = useState({
		email: '',
		password: ''
	});

	const [isLogin, setLogin] = useState(false);

	const inputHandler = (e) => {
		setInput({
			...input,
			[e.target.type]: e.target.value
		})
	}

	const signInHandler = (e) => {
		axios.post("http://localhost:5000/users/signin/basic",{
			email : input.email,
			password : input.password
		}).then(res => {
			console.log("SIGN IN - res : ", res);
			props.handleLogin(res.data);
			setLogin(true);
		}).catch(err => {
			console.log("SIGN IN - err : ", err);
		})
	}

	if(isLogin) return <Redirect to = "/" />

	return (
		<section className="signin-wrapper">
			<Logo />
			<section className="signin-form">
				<label>이메일</label>
				<input type="email" onChange={inputHandler} placeholder="Enter email" />
				<label>비밀번호</label>
				<input type="password" onChange={inputHandler} placeholder="Enter password" />
				<button onClick={signInHandler}> Log In </button>
				<p>or</p>
				<button>Continue with github 🤖</button>
				<a href="/users/signup">Sign up for an account</a>
			</section>
		</section>
	)
}

export default SignIn; 