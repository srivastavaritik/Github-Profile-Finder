import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import GithubState from './context/github/GithubState';

const App=()=> {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);



  

  //get user information
  const getUser = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  //get user repositories
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  //clear users from Page
  const clearUsers = async (text) => {
    console.log('cleared');
    setUsers([]);
    setLoading(false);
  };
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };

    return (
      <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <div className="container">
                    <Users/>
                  </div>
                </Fragment>
              )}
            ></Route>
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props =>  (
              <User {...props}
               getUser={getUser}
               getUserRepos={getUserRepos}
               repos={repos}
                user={user} 
                loading={loading}/> 
            )} />
          </Switch>
        </div>
      </Router>
      </GithubState>
    );
}

export default App;
