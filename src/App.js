import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
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
  clearUsers = async (text) => {
    console.log('cleared');
    this.setState({ users: [], loading: false });
  };
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  render() {
    const { users, loading } = this.state;
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
