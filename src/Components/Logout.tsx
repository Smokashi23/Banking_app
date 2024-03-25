import React, { useState } from "react";
import { Modal } from "antd";
import { useAppDispatch } from "../hooks";
import { logoutUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Dispatch logoutUser action
    dispatch(logoutUser());
    // Redirect to home page
    navigate("/");
    // Hide the modal
    setIsOpen(false);
  };

  const handleCancel = () => {
   
    // Hide the modal
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
