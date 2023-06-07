import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useAuth } from '../providers/AuthContext';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
// import * as Constants from '../constants/config';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Home');
  const [isLogoutModalOpen, toggleLogoutModal] = useState(false);
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();

  const handleClick = (name) => {
    setActiveItem(name);
  };

  return (
    <div>
      <nav
        className="navbar navbar-dark bg-dark navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-file-earmark-richtext-fill d-inline-block align-text-top"
              viewBox="1 0 17 16"
            >
              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM7 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V9.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9s1.54-1.274 1.639-1.208zM5 11h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
            </svg>
            NoteApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li> */}
              <li
                className={`nav-item${activeItem === 'Home' ? 'active' : ''}`}
              >
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={() => handleClick('Home')}
                >
                  Home
                </NavLink>
              </li>
              {isAuthenticated && (
                <li
                  className={`nav-item${
                    activeItem === 'Notes' ? 'active' : ''
                  }`}
                >
                  <NavLink
                    className="nav-link"
                    to="/notes"
                    onClick={() => handleClick('Notes')}
                  >
                    Notes
                  </NavLink>
                </li>
                // <li className="nav-item">
                //   <a className="nav-link active" href="/notes">
                //     Notes
                //   </a>
                // </li>
              )}

              {!isAuthenticated && (
                <li
                  className={`nav-item${
                    activeItem === 'Notes' ? 'active' : ''
                  }`}
                >
                  <NavLink className="nav-link disabled" to="/notes">
                    Notes
                  </NavLink>
                </li>
                // <li className="nav-item">
                //   <a className="nav-link disabled">Notes</a>
                // </li>
              )}
              {isAuthenticated && (
                <li
                  className={`nav-item${
                    activeItem === 'Profile' ? 'active' : ''
                  }`}
                >
                  <NavLink
                    className="nav-link"
                    to="/profile"
                    onClick={() => handleClick('Profile')}
                  >
                    Profile
                  </NavLink>
                </li>
                // <li className="nav-item">
                //   <a className="nav-link active" href="/notes">
                //     Notes
                //   </a>
                // </li>
              )}
              {!isAuthenticated && (
                <li
                  className={`nav-item${
                    activeItem === 'Profile' ? 'active' : ''
                  }`}
                >
                  <NavLink className="nav-link disabled" to="/profile">
                    Profile
                  </NavLink>
                </li>
                // <li className="nav-item">
                //   <a className="nav-link disabled">Notes</a>
                // </li>
              )}
              {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Username
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li> */}
            </ul>
            {isAuthenticated && (
              <form className="d-flex" role="search">
                <input
                  type="search"
                  className="form-control me-3 form-control-dark text-bg-dark"
                  placeholder="Search by Titles..."
                  aria-label="Search"
                />
              </form>
            )}
            {!isAuthenticated && (
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleLogin()}
                >
                  Login
                </button>
              </div>
            )}
            {isAuthenticated && (
              <div
                className="d-flex"
                style={{ color: '#A0A0A0', marginRight: '10px' }}
              >
                username
              </div>
            )}
            {isAuthenticated && (
              <div className="flex-shrink-0 dropdown">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  ></img>
                </a>

                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => toggleLogoutModal(true)}
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="position-static d-block p-4 py-md-5">
        <Modal
          centered
          show={isLogoutModalOpen}
          onHide={() => {
            toggleLogoutModal(false);
          }}
          contentClassName="rounded-4 shadow"
        >
          <Modal.Header closeButton className="border-bottom-0">
            <Modal.Title>
              <h3>Sign out Confirmation</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="py-0">
            <p>Do you really want to Sign out?</p>
          </Modal.Body>

          <Modal.Footer className="flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
            <Button
              variant="danger"
              size="lg"
              onClick={() => {
                toggleLogoutModal(false);
                handleLogout();
              }}
            >
              Sign out
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                toggleLogoutModal(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
