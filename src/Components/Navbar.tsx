import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { RootState, clearStoredState} from "../redux/store";
import { Button, Modal } from "antd";
import "antd/dist/reset.css";
import Logout from "./Logout"; 
import bankLogo from "../images/download.png";
import UserProfile from "./UserProfile"; 
import storage from "../utils/storage";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

const Navbar = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location
  console.log("path: ",location.pathname);
  
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userProfileRef = useRef<HTMLDivElement>(null); // Define the type of userProfileRef

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userProfileRef.current && !userProfileRef.current.contains(event.target as Node)) {
        setShowUserProfile(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () =>{
    console.log("logout");
    
    setIsOpen(false)
    dispatch(logoutUser());
    storage.clearToken()
    clearStoredState();
  };

  const handleCancel = () =>{
    setIsOpen(false)
  };

  const handleProfileClick = () => {
    setShowUserProfile(!showUserProfile);
  };

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
            {(location.pathname === "/" || location.pathname === "/login"  || location.pathname === "/signup" )&& ( 
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
              </>
            )}
            {!(location.pathname === "/" || location.pathname === "/login"  || location.pathname === "/signup" ) && isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/user"
                    onClick={handleProfileClick}
                  >
                    User Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/userDashboard">
                    Account Operations
                  </Link>
                </li>
                <li className="nav-item">
                  <Button
                    type="link"
                    onClick={() => {setIsOpen(true)}}
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
      { isAuthenticated && 
          <Modal
          title="Logout"
          open={isOpen}
          onOk={handleLogout}
          onCancel={handleCancel}
          okText="Logout"
          cancelText="Cancel"
        >
      <p>Are you sure you want to logout?</p> 
      </Modal>
       } 
      {showUserProfile && (
        <div ref={userProfileRef} className="user-profile">
          <UserProfile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
