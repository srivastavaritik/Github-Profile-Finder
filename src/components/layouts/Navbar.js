import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <div style={{display: 'flex'}}>
      
        <h1>
        <i className={icon}  /> {title}
        </h1>      </div>
        
          <ul style={{float:'right'}}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>


    </nav>
  );
};
Navbar.defaultProps = {
  title: 'Github Profile Finder',
  icon: 'fab fa-github',
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
