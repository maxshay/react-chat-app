// React 
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

// Styling
import './App.css';

// Components
import Join from './components/join/Join';
import Chat from './components/chat/Chat';
import Default from './components/Default';

const App = () => (
  <Router>
    <Route path="/" exact component={Join}/>
    <Route path="/chat" component={Chat}/>
    {/* <Route component={Default}></Route> */}
  </Router>
);

export default App;
