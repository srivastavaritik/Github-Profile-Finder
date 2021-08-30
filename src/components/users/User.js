import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import Repos from '../repos/Repos'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({user, loading, getUser, getUserRepos, repos, match}) => {
    useEffect(()=>{
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    },[]);

    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      twitter_username,
    } = user;

    if (loading) return <Spinner />;
    return (
      <Fragment >
        <Link to="/" className="btn btn-light" style={{margin:'0px 30px'}}>
          Back to Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2" style={{margin:'0px 30px'}} >
          <div className="all-center">
            <img
              src={avatar_url}
              alt={name}
              className="round-img"
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
                {twitter_username && (
                  <p>
                    <div className="fab fa-twitter"></div>
                    <a href={`https://www.twitter.com/${twitter_username}`}>
                      {twitter_username}
                    </a>
                  </p>
                )}
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: {login}</strong>
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: {company}</strong>
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: {blog}</strong>
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
            <div className="badge badge-sec">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-danger">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos}/>
      </Fragment>
    );
}

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    User: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

export default User;
