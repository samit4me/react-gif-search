import React from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { signInUser } from '../App/actions';
import { isAuthenticated, getAuthError } from '../App/selectors';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      const replace = nextProps.router.replace;
      const destPath = get(nextProps, 'location.state.nextPathname');
      const redirect = () => {
        if (destPath) replace(destPath);
      };
      redirect();
    }
  }

  handleEmailChange(event) {
    let value = event.target.value;
    let error = '';
    if (!value) {
      error = 'Please enter an email.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address'
    }
    this.setState({ email: { value, error } });
  }

  handlePasswordChange(event) {
    let value = event.target.value;
    let error = '';
    if (!value) {
      error = 'Please enter a password.';
    }
    this.setState({ password: { value, error } });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.signInUser(this.state);
  }
  
  renderAuthError() {
    if (this.props.authError) {
      return <div className="alert alert-danger">{ this.props.authError }</div>;
    }
    return <div></div>;
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div>
          <span>Your logged in!</span>
          <p>Maybe checkout <Link className="nav-link" to="/favorites">Favorites</Link></p>
        </div>);
    }
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>

          {this.renderAuthError()}
          
          <form onSubmit={this.handleFormSubmit}>
            <fieldset className={`form-group ${email.error ? 'has-error' : ''}`}>
              <label>Email</label>
              <div>
                <input
                  type="text"
                  value={email.value}
                  onChange={this.handleEmailChange}
                  placeholder="Email"
                  className="form-control"
                />
                {email.error && <div className="help-block">{email.error}</div>}
              </div>
            </fieldset>

            <fieldset className={`form-group ${password.error ? 'has-error' : ''}`}>
              <label>Password</label>
              <div>
                <input
                  type="password"
                  value={password.value}
                  onChange={this.handlePasswordChange}
                  placeholder="Password"
                  className="form-control"
                />
                {password.error && <div className="help-block">{password.error}</div>}
              </div>
            </fieldset>

            <button action="submit" className="btn btn-primary">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: isAuthenticated(state),
  authError: getAuthError(state),
});
const mapDispatchToProps = (dispatch) => ({
  signInUser: ({ email, password }) => dispatch(signInUser(email.value, password.value)),
});
const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

export default LoginContainer;
