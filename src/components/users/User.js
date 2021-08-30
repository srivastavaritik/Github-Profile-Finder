import React, { Fragment, Component } from 'react';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    User: PropTypes.object.isRequired,
  };

  render() {
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
    } = this.props.user;

    const { loading } = this.props;
    if (loading) return <Spinner />;
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
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
                {twitter_username && <p>
                  <div className="fab fa-twitter"></div>
                  <a href={ `https://www.twitter.com/${twitter_username}` }>{twitter_username}</a>
                </p>}
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>Visit Github</a>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default User;
