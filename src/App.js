import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import About from './components/pages/About';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alert';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import GithubState from './context/github/GithubState';

const App=()=> {
  const [alert, setAlert] = useState(null);

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
                    setAlert={showAlert}
                  />
                  <div className="container">
                    <Users/>
                  </div>
                </Fragment>
              )}
            ></Route>
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" component={User} />
          </Switch>
        </div>
      </Router>
      </GithubState>
    );
}

export default App;
