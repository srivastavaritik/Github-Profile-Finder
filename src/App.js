import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar'; 
import Users from './components/users/Users'

class App extends Component { 
  render(){
    return (
      <div className="App">
      <Navbar />
      <Users />
      </div>
    );
  }
}

export default App;
