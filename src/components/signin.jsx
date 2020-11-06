import React from 'react';
import { NavLink } from 'react-router-dom';

import request from '../services/request';
import '../assets/scss/style.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isError: false,
    };
  }

  changeEvent = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  loginClick = async () => {
    const { email, password } = this.state;
    this.setState({ isError: false });
    try {
      const result = await request.post('login/', { email, password });
      if (result.status === 200) {
        this.props.history.push('dashboard');
      }
    } catch (error) {
      console.log(error)
      this.setState({ isError: true });
      console.log('failed auth');
    }
  };
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              {this.state.isError && (
                <p className="mb-2 text-left text-danger">Wrong Credentials</p>
              )}
              <div className="input-group mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  onChange={this.changeEvent}
                  value={this.state.email}
                  placeholder="Email"
                />
              </div>
              <div className="input-group mb-4">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={this.changeEvent}
                  value={this.state.password}
                  placeholder="password"
                />
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input
                    type="checkbox"
                    name="checkbox-fill-1"
                    id="checkbox-fill-a1"
                  />
                  <label htmlFor="checkbox-fill-a1" className="cr">
                    {' '}
                    Save credentials
                  </label>
                </div>
              </div>
              <button
                className="btn btn-primary shadow-2 mb-4"
                onClick={this.loginClick}
              >
                Login
              </button>
              <p className="mb-2 text-muted">
                Forgot password? <NavLink to="/">Reset</NavLink>
              </p>
              <p className="mb-0 text-muted">
                Don’t have an account? <NavLink to="/">Signup</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
