import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-sm-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="app-logo"
            />
          </Link>
          <ul className="nav-items-container">
            <Link to="/" className="link-item">
              <li className="icon-list-item">
                <AiFillHome className="icon-size" />
              </li>
            </Link>
            <Link to="/jobs" className="link-item">
              <li className="icon-list-item">
                <BsBriefcaseFill className="icon-size" />
              </li>
            </Link>
            <li className="icon-list-item">
              <button
                type="button"
                className="logout-button-icon"
                onClick={onClickLogOut}
              >
                <FiLogOut className="icon-size" />
              </button>
            </li>
          </ul>
        </div>
        <div className="nav-lg-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="app-logo"
            />
          </Link>
          <ul className="list-container">
            <Link to="/" className="link-item">
              <li className="list-button">Home</li>
            </Link>
            <Link to="/jobs" className="link-item">
              <li className="list-button">Jobs</li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
