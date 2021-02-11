import React, { useEffect, useState } from 'react';
import Intro from './pages/Intro';
import './styles/common.css';
import Header from './components/common/Header';
import { Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Board from './pages/Board';

import axios from 'axios';
import axiosRequest from '../src/helper/axiosRequest.js';


function App() {
  
  const [isLogin, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  // board list
  const [boards, setBoards] = useState(null);
  const [userInfo, setUserInfo] = useState({
    id : '',
    
  })


  const HandleLogin = (data) => {
    console.log("after Login", data);
    setAccessToken(data.data.accessToken);
    setLogin(true);
  }

  const HandleLogout = () => {
    setAccessToken('');
    setLogin(false);
  }

  useEffect(() => {
    // login 성공했으면, boards list 가져오기
    // const boards = axiosRequest('/boards', accessToken, 'get', { user_id : 1 } )
  }, [accessToken])

  


  return (
    <div className="App">
      <Header isLogin = {isLogin} HandleLogout = {HandleLogout} accessToken = {accessToken}/>
      <div className="body">
        
        <Route path="/intro" render = {() => <Intro />} />
        <Route path="/main" render = {() => <Main />} />
        <Route path="/board" render = { () => <Board accessToken={accessToken}/> } />

        <Route exact path="/" render = {() => {
          if(isLogin){
            // return <Redirect to = "/board" /> 
            //boards, tasks, userInfo
           return <Redirect to = "/main" /> 
          }
          return <Redirect to = "/intro" />
        }}/>

        <Switch>
          <Route path="/users/signin" render={() => <SignIn handleLogin = {HandleLogin} isLogin = {isLogin}/>} />
          <Route path="/users/signup" component={SignUp} />
        </Switch>

      </div>
    </div>
  );
}

export default App;
