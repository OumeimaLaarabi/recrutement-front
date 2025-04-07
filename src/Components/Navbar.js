import React, { useState, useEffect } from "react";
import "../scss/navbar.scss";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useUserContext } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, handleLogout } = useUserContext();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setIsUserLoggedIn(!!user); // Update isUserLoggedIn based on user authentication status
  }, [user]);

  const backgroundStyle = isUserLoggedIn ? { background: "#F0F2F5" } : null; // Apply background style only if the user is logged in

  return (
    <div>
      <nav className="navbar-container" style={backgroundStyle}>
        <div className="nav-content">
        
          <ul>
            {!user && (
              <li>
                <Link style={{ textDecoration: "none" }} to="/">
                  <a className="menu-item">Home </a>
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <HashLink
                  to="/#services"
                  style={{ textDecoration: "none" }}
                  className="menu-item"
                >
                  Services
                </HashLink>
              </li>
            )}
            {!user && (
              <li>
                <HashLink
                  to="/#community"
                  style={{ textDecoration: "none" }}
                  className="menu-item"
                >
                  Community
                </HashLink>
              </li>
            )}
            {!user && (
              <li>
                <HashLink
                  to="/#about"
                  style={{ textDecoration: "none" }}
                  className="menu-item"
                >
                  About
                </HashLink>
              </li>
            )}
            {!user && (
              <li>
                <Link style={{ textDecoration: "none" }} to="/offers">
                  <a className="menu-item">Jobs </a>
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link style={{ textDecoration: "none" }} to="/Login">
                  <a className="menu-item">Login </a>
                </Link>
              </li>
            )}
            {!user && (
              <Link style={{ textDecoration: "none" }} to="/Register">
                <a className="register-button">Register </a>
              </Link>
            )}
            {user && user.role === "Talent" && (
              <li>
                <Link style={{ textDecoration: "none" }} to="/HomeTalent">
                  <a className="menu-item">My Jobs</a>
                </Link>
              </li>
            )}
            {user && user.role === "Recruiter" && (
              <li>
                <Link style={{ textDecoration: "none" }} to="/HomeRecruiter">
                  <a className="menu-item">My Offers</a>
                </Link>
              </li>
            )}
            {user && user.role === "Recruiter" && (
              <li>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/RecruiterApplications"
                >
                  <a className="menu-item">Applications</a>
                </Link>
              </li>
            )}
            {user && (
              <li className="user-dropdown">
                <span className="menu-item">{user.email}</span>
                <ul className="dropdown-list">
                  <li>
                    <Link to="/RecruiterProfile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <span className="dropdown-item" onClick={handleLogout}>
                      Disconnect
                    </span>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
