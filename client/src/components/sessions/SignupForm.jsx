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
    confirmPassword: yup.string().required("Please confirm password").oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
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
          r.json().then(err => setErrors((currentErrors) => [...currentErrors, err.errors]))
        }
      })
    }
  })
  
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
          {formik.errors.firstName ? <div className="text-danger" >{formik.errors.firstName}</div> : ""}
        </div>

        <div className="form-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName ? <div className="text-danger" >{formik.errors.lastName}</div> : ""}
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div className="text-danger" >{formik.errors.email}</div> : ""}
        </div>

        <div className="form-field">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          {formik.errors.phoneNumber ? <div className="text-danger" >{formik.errors.phoneNumber}</div> : ""}
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? <div className="text-danger" >{formik.errors.password}</div> : ""}  
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
