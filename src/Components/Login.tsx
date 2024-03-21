import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { LoginData } from "../interfaces";
import {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
} from "../redux/userSlice";
import { RootState } from "../redux/store";
import axios from 'axios'; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import storage from "../utils/storage";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();
    dispatch(loginUserRequest());

    try {
      const response = await axios.post('http://localhost:1925/login', formData);
      
      if (response.status === 200) { 
        dispatch(loginUserSuccess(formData));
        console.log(response)
        storage.setToken(response.data.token)
      } else {
        dispatch(loginUserFailure("Login failed"));
      }
    } catch (error) {
      dispatch(loginUserFailure("Login failed")); 
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="username"
            name="username"
            className="form-control"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
