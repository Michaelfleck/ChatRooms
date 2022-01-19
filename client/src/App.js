import './App.css';
import ChatArea from './ChatArea';

import {useState} from 'react'
import Login from './Login';

function App() {


  return (
    <div className="App">
      <ChatArea/>
      <Login/>
    </div>
  );
}

export default App;
