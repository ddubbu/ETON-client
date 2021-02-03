import React, { useState } from 'react';
import Intro from './pages/Intro';
import './styles/common.css';


function App() {
  
  const [isLogin, setLogin] = useState(false);

  return (
    <div className="App">
      {isLogin ? 
      '로그인 된 메인'
      :
      <Intro />
      }
      
    </div>
  );
}

export default App;
