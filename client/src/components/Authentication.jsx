import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

const Form = styled.form`
  /* Add your styles for the form here */
`;

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false)
  const history = useHistory();

  const handleClick = () => setSignUp((signUp) => !signUp);
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Username is required'),
      email: signUp ? yup.string().email('Invalid email address').required('Email is required') : yup.string(),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      fetch(signUp ? '/signup' : '/login', {
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
            history.push('/');
          });
        } else {
          res.json().then(error => setError(error.message));
        }
      });
    }
  });

  return (
    <>
      <h2 style={{ color: 'red' }}> {formik.errors.name}</h2>
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      <h2>Register </h2>
      <h2>{signUp ? 'Already a member?' : 'Not a member'}</h2>
      <button type="button" onClick={handleClick}>
        {signUp ? 'Log In' : 'Sign Up'}
      </button>
      <Form onSubmit={formik.handleSubmit}>
        <label>
          Email/ username
          <input
            type="text"
            name="email"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Password
        </label>
        <input 
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
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
      </Form>
    </>
  );
}

export default Authentication;
