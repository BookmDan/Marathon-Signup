import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Col } from "react-bootstrap";
import * as yup from 'yup';

function LoginForm({ setSignupMode, signupMode,onLogin}) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setSignupMode(!signupMode)
    setSuccess(false);
    setError(false);
  };

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email required'),
    password: yup.string().required('Password required'),
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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    }).then(r => {
      if (r.ok) {
        r.json().then(user =>onLogin(user))
        navigate('/')    
      } else {
        r.json().then(err => {
          // setIsLoading(false)
          console.log(err.errors)
          setError(err.errors)
        })
      }
    })
      console.log('Login submitted with:', values);
      navigate('/');
    }
  });

  const dislpayErrors =(error) =>{
    return error ? <p style={{ color: "red" }}>{error}</p> : null
  }
  return (
    <div>
      <Col lg="5" className="mx-auto">
        <h3 className="m-5">
          Please log in to view page
        </h3>    
        <Form className="m-4" onSubmit={formik.handleSubmit} >
          {/* <div  className="form-field"> */}
          <Form.Group className="m-3 form-floating" >
            <Form.Label >Email</Form.Label>
            <Form.Control
                type="text"
                name="email"
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            {dislpayErrors(formik.errors.email)}
          </Form.Group>
          <Form.Group className="m-3 form-floating" >
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              name="password"
              placeholder='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {dislpayErrors(formik.errors.password)}
          </Form.Group>
          <div id="button-container">
            <button type="submit">Log In</button>
          </div>
          <div className="ms-4">
            <Button className="m-3 btn-dark" onClick={handleClick} >Click here to create an account</Button>
          </div>
        </Form>
      </Col>
    </div>
  );
}

export default LoginForm;
