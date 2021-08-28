import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar'; 
import Search from './components/users/Search';
import Users from './components/users/Users';
import axios from 'axios';


class App extends Component { 
  state={
    users: [],
    loading : false
  };

  async componentDidMount() {

    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data ,loading: false });
  }

  searchUsers=async text =>{
    console.log(text);
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items ,loading: false });
  }
  clearUsers=async text =>{
    console.log('cleared');
    this.setState({users:[] ,loading: false});
  }

  render(){
    return (
      <div className="App">
      <Navbar />
      <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}/>
      <div className="container">
      <Users loading={this.state.loading} users={this.state.users} />
      </div>

      </div>
    );
  }
}

export default App;
