import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import store from "./redux/store";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import SignUp from "./Components/Signup";
import Login from "./Components/Login";
import AccountOperations from "./Pages/AccountOperation";
import DepositAmount from "./Components/DepositAmount";
import WithdrawAmount from "./Components/WithdrawAmount";
import DeleteAccount from "./Components/DeleteAccount";
import CreateAccount from "./Components/CreateAccount";
import storage from "./utils/storage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <ToastContainer /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<AccountOperations />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/withdraw" element={<WithdrawAmount />} />
            <Route path="/deposit" element={<DepositAmount />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
