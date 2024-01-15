import React from 'react';
import { useFormik } from 'formik';

function NewUser() {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phonenumber: '',
    },
    onSubmit: (values) => {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
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
        <button type="submit">Add New User</button>
      </form>
    </div>
  );
}

export default NewUser;
