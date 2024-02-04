import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

function SignupForm({ signupMode, setSignupMode, onLogin }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const addressRef = useRef();

  const handleReturnClick = () => {
    setSignupMode(!signupMode);
  };

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    password: yup.string().required("Please enter a password").min(8, "Password must be at least 8 characters"),
    confirmPassword: yup.string().required("Please confirm password").oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      setErrors([]);
      if (formik.values.password === formik.values.confirmPassword) {
        fetch('/api/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, "address": addressRef.current.value }),
        }).then(r => {
          if (r.ok) {
            r.json().then(user => onLogin(user));
            navigate('/');
          } else {
            r.json().then(err => setErrors((currentErrors) => [...currentErrors, err.errors]));
          }
        });
      } else {
        setErrors((currentErrors) => [...currentErrors, "Password confirmation did not match"]);
      }
    },
  });

  return (
    <div>
      <Button className="m-3 btn-dark" onClick={handleReturnClick}>return to login</Button>
      <Col lg="5" className="mx-auto">
        <h3 className="m-3 text-info">
          Create a new RunYourSocksOff account
        </h3>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-floating w-50 m-3">
            <Form.Control
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <Form.Label>First Name</Form.Label>
            {formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : ""}
          </Form.Group>

          <Form.Group className="form-floating w-50 m-3">
            <Form.Control
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <Form.Label>Last Name</Form.Label>
            {formik.errors.lastName ? <div className="text-danger">{formik.errors.lastName}</div> : ""}
          </Form.Group>
          <Form.Group className="form-floating w-50 m-3">
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Form.Label>Email</Form.Label>
            {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : ""}
          </Form.Group>

          <Form.Group className="form-floating w-50 m-3">
            <Form.Control
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <Form.Label>Phone Number</Form.Label>
            {formik.errors.phoneNumber ? <div className="text-danger">{formik.errors.phoneNumber}</div> : ""}
          </Form.Group>

          <Form.Group className="form-floating w-50 m-3">
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Form.Label>Password</Form.Label>
            {formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : ""}
          </Form.Group>

          <Form.Group className="form-floating w-50 m-3">
            <Form.Control
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            <Form.Label>Confirm Password</Form.Label>
            {formik.errors.confirmPassword ? <div className="text-danger">{formik.errors.confirmPassword}</div> : ""}
          </Form.Group>

          <div className="d-flex">
            {errors.map((err) => (
              <p className="text-danger m-3" key={err}>{err}</p>
            ))}
            <Button className="ms-auto btn-info" type="submit">Sign up</Button>
          </div>
        </Form>
      </Col>
    </div>
  );
}

export default SignupForm;
