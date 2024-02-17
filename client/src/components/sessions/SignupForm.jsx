import { useFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";


const SignupForm = ({ signupMode, setSignupMode, onLogin }) => {
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',

    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      setErrors([])
      fetch('/api/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(r => {
        if (r.ok) {
          r.json().then(user => onLogin(user))
          navigate('/')
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
    }
  })
  
  const dislpayErrors =(error) =>{
    return error ? <p style={{ color: "red" }}>{error}</p> : null
  }
  const handleReturnClick = () => {
    setSignupMode(!signupMode)
  }
  
  return (
    <div>
       <Button className="m-3 btn-dark"  onClick={handleReturnClick}>Return to login</Button>
        <Col lg="5" className="mx-auto">
        <h3 className="m-3 text-info ">
          Create a new Account
        </h3>
      <Form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {dislpayErrors(formik.errors.firstName)}
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {dislpayErrors(formik.errors.lastName)}
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {dislpayErrors(formik.errors.email)}
        </div>
        <div className="form-field">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          {dislpayErrors(formik.errors.phoneNumber)}
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {dislpayErrors(formik.errors.password)}
        </div>
        <div id="button-container">
          <button type="submit">Sign Up</button>
        </div>
        </Form>
      </Col>
    </div>
  );
};

export default SignupForm;
