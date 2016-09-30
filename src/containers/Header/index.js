import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signOutUser } from '../App/actions';
import { isAuthenticated } from '../App/selectors';

class Header extends React.Component {
  handleSignout(event) {
    event.preventDefault();
    this.props.signOutUser();
  }

  renderAuthLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/favorites">My Favorites</Link>
        </li>,
        <li className="nav-item" key={2}>
          <a className="nav-link" href="#" onClick={(event) => this.handleSignout(event)}>Sign Out</a>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/login">Login</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ]
    }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">ReactGiphy</Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
             {this.renderAuthLinks()}
           </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: isAuthenticated(state),
});
const mapDispatchToProps = (dispatch) => ({
  signOutUser: () => dispatch(signOutUser()),
});
const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
