import React, { useEffect, useState } from 'react';
import Intro from './pages/Intro';
import './styles/common.css';
import Header from './components/common/Header';
import { Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import axios from 'axios';

function App() {
  
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const HandleLogin = (data) => {
    console.log(data);
    setAccessToken(data.accessToken);
    setLogin(true);
  }

  useEffect(() => {
    console.log("useEffect");
    axios.post('http://localhost5000/users/signin/refreshToken')
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  })

  // axios.post('http://localhost5000/users/signin/refreshToken')
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  


  return (
    <div className="App">
      <Header isLogin = {isLogin}/>
      <div className="body">
        
        <Route path="/intro" render = {() => <Intro />} />
        <Route path="/main" render = {() => <Main />} />

        <Route exact path="/" render = {() => {
          if(isLogin){
           return <Redirect to = "/main" /> 
          }
          return <Redirect to = "/intro" />
        }}/>

        <Switch>
          <Route path="/users/signin" render={() => <SignIn handleLogin = {HandleLogin}/>} />
          <Route path="/users/signup" component={SignUp} />
        </Switch>

      </div>
    </div>
  );
}

export default App;
