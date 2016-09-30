import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signUpUser } from '../App/actions';
import { isAuthenticated, getAuthError } from '../App/selectors';

class Signup extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
      passwordConfirmation: { value: '', error: '' },
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
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

  handlePasswordConfirmationChange(event) {
    let value = event.target.value;
    let error = '';
    if (!value) {
      error = 'Please enter a password confirmation.';
    } else if (value !== this.state.password.value) {
      error = 'Passwords do not match.';
    }
    this.setState({ passwordConfirmation: { value, error } });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.signUpUser(this.state);
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
    const { email, password, passwordConfirmation } = this.state;
    return(
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Sign Up</h2>

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

            <fieldset className={`form-group ${passwordConfirmation.error ? 'has-error' : ''}`}>
              <label>Password Confirmation</label>
              <div>
                <input
                  type="password"
                  value={passwordConfirmation.value}
                  onChange={this.handlePasswordConfirmationChange}
                  placeholder="Password Confirmation"
                  className="form-control"
                />
                {passwordConfirmation.error && <div className="help-block">{passwordConfirmation.error}</div>}
              </div>
            </fieldset>

            <button action="submit" className="btn btn-primary">Sign Up</button>
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
  signUpUser: ({ email, password }) => dispatch(signUpUser(email.value, password.value)),
});
const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);

export default SignupContainer;
