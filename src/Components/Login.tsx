  import React from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import { useAppDispatch, useAppSelector } from "../hooks";
  import { RootState } from "../redux/store";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom"; 
  import "react-toastify/dist/ReactToastify.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import storage from "../utils/storage";
  import { LoginData } from "../interfaces";
  import { loginUserFailure, loginUserRequest, loginUserSuccess } from "../redux/userSlice";
import { JwtPayload, jwtDecode } from "jwt-decode";

interface TokenPayload{
  Role:string
}
  const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useAppSelector(
      (state: RootState) => state.user
    );
    const role = useAppSelector(
      (state: RootState) => state.user && state.user.user && state.user.user.role
    );
    
    const initialValues: LoginData = { username: "", password: "" };
    
    const validationSchema = Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    });
    
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        dispatch(loginUserRequest());
        
        try {
          const response = await axios.post(
            "http://localhost:1925/login",
            values
            );
            
            if (response.status === 200) {
              dispatch(loginUserSuccess(values));
              storage.setToken(response.data.token);
              toast.success("Login successful");
              dispatch(loginUserSuccess(values));
              console.log({role});
              if(response.data.token){
                // const decoded = jwtDecode(response.data.token);
                const decoded = jwtDecode<TokenPayload>(response.data.token);
                console.log("decode: ",decoded);
                console.log("decoded aud: ",decoded.Role);
                
                if (decoded.Role=== "admin") {
                  console.log("in if");
                  navigate("/admin/userlist");
                  return
                }
                console.log("outside if");
                
                
            }
            navigate("/userDashboard"); 
          } else {
            dispatch(loginUserFailure("Login failed"));
            toast.error("Login failed");
          }
        } catch (error) {
          dispatch(loginUserFailure("Login failed"));
          toast.error("Invalid Credentials");
          resetForm();
        }
      },
    });

    return (
      <div className="container">
        <h2>Login</h2>
        {isLoading && <p>Loading...</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-danger">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger">{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  };

  export default Login;