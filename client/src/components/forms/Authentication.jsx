import { useState } from 'react';
// import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleClick = () => {
    setSignUp((prevSignUp) => !prevSignUp);
    setSuccess(false);
    setError(false);
  };
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: signUp ? yup.string().email('Invalid email address').required('Email is required') : yup.string(),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      fetch(signUp ? '/api/signup' : '/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values),
      })
        .then(res => {
          if (res.ok) {
            res.json().then(user => {
              updateUser(user);
              setSuccess(true)
              navigate('/');
            });
          } else {
            res.json().then(err => {
              setError(err.message);
            })
          }
        })
    }
  })

  return (
    <>
      <h2 style={{ color: 'red' }}> {formik.errors.email}</h2>
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {success && <h2 style={{ color: 'green' }}>Signup successful! You can now log in.</h2>}
      <h2>Register </h2>
      <h2>{signUp ? 'Already a member?' : 'Not a member'}</h2>
      <button type="button" onClick={handleClick}>
        {signUp ? 'Log In' : 'Sign Up'}
      </button>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </label>
        <label> Password </label>
        <input 
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
        {signUp && (
          <>
            <label>
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            )}
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Authentication;
