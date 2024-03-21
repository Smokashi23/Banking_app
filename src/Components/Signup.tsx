import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  mobile: Yup.string().required('Mobile number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Password must be at least 8 characters, one uppercase letter, one lowercase letter, one special symbol, and one digit'
    )
    .required('Password is required'),
  address: Yup.string().required('Address is required'),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {

      name: '',
      mobile: '',
      email: '',
      password: '',
      address: '',
      role: 'Customer',
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post('http://localhost:1925/signup', values)
        .then((response) => {
          console.log(response.data);
          alert('Sign up successful!');
        })
        .catch((error) => {
          console.error(error);
          alert('Sign up failed. Please try again.');
        });
    },
  });

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className="form-control"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobile && formik.errors.mobile ? <div className="text-danger">{formik.errors.mobile}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address ? <div className="text-danger">{formik.errors.address}</div> : null}
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
