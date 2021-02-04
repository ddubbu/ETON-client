import React, { useState } from 'react';
import Intro from './pages/Intro';
import './styles/common.css';
import Header from './components/common/Header';
import { Route, Link, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  
  const [isLogin, setLogin] = useState(false);

  return (
    <div className="App">
      <Header/>
      <div className="body">
        {/* <Intro /> */}
        <Route exact path="/" component={Intro}/>

        <Switch>
          <Route path="/users/signin" component={SignIn} />
          <Route path="/users/signup" component={SignUp} />
        </Switch>

      </div>
    </div>
  );
}

export default App;
