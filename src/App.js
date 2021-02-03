import React from 'react';
import './styles/common.css';
import Header from './components/common/Header';
import Intro from './pages/Intro.js'

function App() {
  

  return (
    <>
    <Header/>
    <div className="App">
      <Intro/>
    </div>
    </>
  );
}

export default App;
