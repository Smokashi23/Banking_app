import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { RootState } from "../redux/store";
import { Button } from "antd";
import "antd/dist/reset.css";
import Logout from "./Logout"; // Import the Logout component
import bankLogo from "../images/download.png";

const Navbar = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const [logoutVisible, setLogoutVisible] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={bankLogo} alt="SBM Logo" className="logo"style={{ width: "50px", height: "auto" }}
          />
        </Link>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li> */}
              </>
            )}
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                    User Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/account">
                    Account Operations
                  </Link>
                </li>
                <li className="nav-item">
                  <Button
                    type="link"
                    onClick={() => setLogoutVisible(true)}
                    style={{ color: "red" }}
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {logoutVisible && <Logout />} {/* Render the Logout component */}
    </nav>
  );
};

export default Navbar;
