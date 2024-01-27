// import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 

function NewUser() {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phonenumber: '',
    }, 

    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      phonenumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    }),

    onSubmit: (values, { setSubmitting, resetForm }) => {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          // Provide success feedback to the user
          // You might want to show a success message, reset the form, or redirect the user
          resetForm(); // Reset the form after successful submission
        })
        .catch((err) => {
          console.error(err);
          // Provide error feedback to the user
          // You might want to show an error message or handle the error in a specific way
        })
        .finally(() => {
          setSubmitting(false); // Reset the submitting state
        });
      setTimeout(() => {
        console.log('Form submitted successfully!');
        // Reset the form and provide success feedback
        resetForm();
        // Additional actions based on successful submission
      }, 1000);
    },
    validate: (values) => {
      const errors = {};
      if (!values.email.includes('@')) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          required
          value={formik.values.first_name}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          required
          value={formik.values.last_name}
          onChange={formik.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          required
          value={formik.values.phonenumber}
          onChange={formik.handleChange}
        />
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Add New User'}
        </button>
      </form>

      {formik.submitCount > 0 && !formik.isSubmitting && !formik.errors && (
        <div style={{ color: 'green' }}>User successfully added!</div>
      )}

      {formik.submitCount > 0 && (formik.errors || formik.isSubmitting) && (
        <div style={{ color: 'red' }}>{formik.errors ? 'Please fix the errors' : 'Submission failed'}</div>
      )}
    </div>
  );
}

export default NewUser;
