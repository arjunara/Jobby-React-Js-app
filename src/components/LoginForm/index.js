import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFormSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFormFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginFetchUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginFetchUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitFormSuccess(data.jwt_token)
    } else {
      this.onSubmitFormFailure(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          id="username"
          className="input"
          placeholder="Username"
          onChange={this.onChangeUsernameInput}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          id="password"
          className="input"
          placeholder="Password"
          onChange={this.onChangePasswordInput}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            {this.renderUserNameField()}
            {this.renderPasswordField()}
            <button type="submit" className="submit-button">
              Login
            </button>
            {showError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
