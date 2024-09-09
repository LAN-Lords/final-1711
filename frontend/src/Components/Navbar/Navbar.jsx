import React from 'react';
import { useAuth } from '../../AuthContext'; // Adjust the path as needed

const Navbar = () => {
  const { user } = useAuth(); // Get user from context

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-md-top">
        <div className="container-fluid">
          <h1 className='text-lg'>
            <a className="navbar-brand fs-2" href="#">
              <i className="bi bi-train-front-fill"></i>
              Rail <span>Madad</span>
            </a>
          </h1>
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
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item d-flex align-items-center">
                <i className="bi bi-person-fill fs-2"></i>
                <span className="nav-link">{user ? user.name : 'Guest'}</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
