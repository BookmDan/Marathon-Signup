import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Form = styled.form`
  /* Add your styles for the form here */
`;

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);

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
      fetch(signUp ? '/users' : 'login', {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(values)
      })
        .then(res => res.json())
        .then(user => {
          updateUser(user)
          history.push('/')
      })
      // console.log(values);
    },
  });

  return (
    <>
      <h2 style={{ color: 'red' }}> {'Errors Here!'}</h2>
      <h2>Please Log in or Sign up!</h2>
      <h2>{signUp ? 'Already a member?' : 'Not a member'}</h2>
      <button type="button" onClick={handleClick}>
        {signUp ? 'Log In!' : 'Register now!'}
      </button>
      <Form onSubmit={formik.handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </label>
        {formik.touched.name && formik.errors.name && (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
        )}

        {signUp && (
          <>
            <label>
              Email
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </label>
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