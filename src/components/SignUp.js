import React from 'react';
import { Link } from 'react-router-dom';

import AuthHelper from './AuthHelper';


class SignUp extends React.Component {

  Auth = new AuthHelper();

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      formSubmitted: false,
      formValid: false,
      message: null,
      password: '',
      userName: '',
    };

    this.signUpUser = this.signUpUser.bind(this);
  }

  componentDidMount() {
    if(this.Auth.loggedIn()) this.props.history.push('/dashboard');
  }

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => this._validateForm());
  };

  _validateForm = () => {
    const { email, password, username } = this.state;
    const formValid = (
      email !== '' &&
      password !== '' &&
      username !== ''
    );
    this.setState({ formValid });
  };

  signUpUser(e) {
    e.preventDefault();
    this.setState({ formSubmitted: true, message: null });
    const {
      email,
      password,
      userName,
    } = this.state;

    fetch('http://wallet.conceal.network/api/user/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name: userName,
        password,
      }),
    })
      .then(r => r.json())
      .then(res => {
        // console.log(res);
        if (res.result === 'success') return this.props.history.replace('/login');
        this.setState({ formSubmitted: false, message: res.message });
      });
  };

  render() {
    const {
      email,
      formSubmitted,
      formValid,
      message,
      password,
      userName,
    } = this.state;

    return (
      <div id="register">
        <h1>Register</h1>
        <form onSubmit={this.signUpUser}>
          <input
            placeholder="User Name"
            type="text"
            name="userName"
            value={userName}
            minLength={4}
            onChange={this._handleChange}
          />
          <input
            placeholder="E-mail"
            type="email"
            name="email"
            value={email}
            onChange={this._handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            minLength={8}
            onChange={this._handleChange}
          />
          <button
            type="submit"
            disabled={formSubmitted || !formValid}
          >
            Submit
          </button>
        </form>

        {message &&
          <div className="error-message">{message}</div>
        }

        <div>
          Already have an account? <Link className="link" to="/login">Login</Link><br />
          Lost password? <Link className="link" to="/reset_password">Reset here</Link>
        </div>
        ​
      </div>
    );
  }
}

export default SignUp;
