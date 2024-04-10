import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import AdminDashboard from "./Pages/AdminDashbord";
import { UserList } from "./Components/UserList";
import UserProfile from "./Components/UserProfile";
import Protected from "./Components/AuthLayout";
// import { UpdateUser } from "./Components/UpdateUser";

// const getUserRole = () => {
//   const userRole = storage.getItem('userRole');
//   return userRole || 'customer';
// };

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = false;
  // const userRole = getUserRole();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div>
            <Navbar /> {/* Pass isAuthenticated prop to Navbar */}
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/userDashboard" element={
              <Protected authentication={true}>
                <AccountOperations />
              </Protected>
                } />
              {/* {isAuthenticated && userRole === 'admin' && (
                <Route path="/admin" element={<AdminDashboard />} />
              )} */}
              {/* <Route path="/admin/userlist" element={<AdminDashboard />} /> */}
              <Route
                path="/admin/userlist"
                element={
                  <Protected authentication={true}>
                    <UserList />
                  </Protected>
                }
              />
              {/* <Route
                path="/create-account"
                element={
                  <Protected authentication={true}>
                    <CreateAccount />
                  </Protected>
                }
              /> */}
              <Route
                path="/withdraw"
                element={
                  <Protected authentication={true}>
                    <WithdrawAmount />
                  </Protected>
                }
              />
              <Route
                path="/deposit"
                element={
                  <Protected authentication={true}>
                    <DepositAmount />
                  </Protected>
                }
              />
              <Route
                path="/delete-account"
                element={
                  <Protected authentication={true}>
                    <DeleteAccount />
                  </Protected>
                }
              />
              <Route path="/user" element={<UserProfile />} />
              {/* <Route path="/user/update/:id" element={<UpdateUser/>}/> */}
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
