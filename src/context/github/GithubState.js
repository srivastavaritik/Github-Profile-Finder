import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search users
  const searchUsers = async (text) => {
    console.log(text);
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //Get user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
        type: GET_USER,
        payload: res.data,
      });
  };

  //Get Repositories
  const getUserRepos = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&CLIENT_SECRET=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
        type: GET_REPOS,
        payload: res.data
      });
  };

  //Clear 
  const clearUsers = async (text) => dispatch({type: CLEAR_USERS});

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
