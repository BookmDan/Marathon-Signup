import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Button, Col } from "react-bootstrap";
import * as yup from 'yup';
import {UserContext} from '../../context/UserContext'

function LoginForm({ setSignupMode, signupMode, onLogin}) {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const { login } = useContext(UserContext)
  
  const navigate = useNavigate();
  // const {setUserId} = useUser()

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
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(r => {
        if (r.ok) {
          r.json().then(user => {
            onLogin(user);
            login(user)
            console.error("Login success:", r.status);
            // setUserId(user.id)
            // console.log("User ID:", user.id)
            navigate(`/select-race/${user.id}`)    
          })
        } else {
          r.json().then(err => {
            console.log(err.errors)
            setError(Array.isArray(err.errors) ? err.errors : [err.errors])
          })
        }
      }).catch(err => {
        console.error('Error during login:', err);
        setError(['An error occurred during login. Please try again later.'])
      })
    }
  });


  return (
    <div>
      <Col lg="5" className="mx-auto">
        <h3 className="m-5">
          Please log in to view page
        </h3>    
        <Form className="m-4" onSubmit={formik.handleSubmit} >
          <Form.Group className="m-3 form-floating" >
            <Form.Label >Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {error.map((errorMessage, index) => (
              <p key={index} style={{ color: "red" }}>{errorMessage}</p>
            ))}
            {formik.errors.email && <p style={{ color: "red" }}>{formik.errors.email}</p>}
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
            
            {formik.errors.password && <p style={{ color: "red" }}>{formik.errors.password}</p>}
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
