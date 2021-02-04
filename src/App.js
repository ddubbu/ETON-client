import React, { useState } from 'react';
import Intro from './pages/Intro';
import './styles/common.css';
import Header from './components/common/Header';
import Intro from './pages/Intro.js'

function App() {
  
  const [isLogin, setLogin] = useState(false);

  return (
    <>
    <Header/>
    <div className="App">

    </div>
    </>
  );
}

export default App;
