import React from 'react';
import PropTypes from 'prop-types';


const Navbar = ({icon, title}) => {
    return (
      <nav className="navbar bg-primary">
        <div>
          <h1> 
              <i className={icon} /> {title}
              </h1>
        </div>
      </nav>
    );
}
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github',
};
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

export default Navbar;
