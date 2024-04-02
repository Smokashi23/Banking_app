import React, { useState } from "react";
import { Modal } from "antd";
import { useAppDispatch } from "../hooks";
import { logoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import storage from "../utils/storage";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    
    // localStorage.removeItem("token");
    storage.clearToken()
  
    dispatch(logoutUser());
  
    navigate("/");

    setIsOpen(true);
    // setLogoutVisible(false)
  };

  const handleCancel = () => {
   

    // setLogoutVisible(false)
    setIsOpen(false);
  };

  return (
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
  );
};

export default Logout;
