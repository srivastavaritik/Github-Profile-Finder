import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }

  searchUsers = async (text) => {
    console.log(text);
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  //get user information
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  //get user repositories
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  //clear users from Page
  clearUsers = async (text) => {
    console.log('cleared');
    this.setState({ users: [], loading: false });
  };
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    const { users, user, repos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Alert alert={this.state.alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <div className="container">
                    <Users loading={loading} users={users} />
                  </div>
                </Fragment>
              )}
            ></Route>
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props =>  (
              <User {...props}
               getUser={this.getUser}
               getUserRepos={this.getUserRepos}
               repos={repos}
                user={user} 
                loading={loading}/> 
            )} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
