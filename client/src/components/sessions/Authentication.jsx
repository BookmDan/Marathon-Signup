import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import SignupForm from './SignupForm'; 

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setSignUp((prevSignUp) => !prevSignUp);
    setSuccess(false);
    setError(false);
  };
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    }, 
  })

  const handleFormSubmit = (values) => {
    const endpoint = signUp ? '/api/signup' : '/api/login'; // Determine the endpoint based on signUp state
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid credentials');
      }
    })
    .then(data => {
      updateUser(data); // Update user state with the response data
      setSuccess(true); // Set success state to true
      navigate('/select-race');
    })
    .catch(error => {
      setError(error.message);
    });
  };

  return (
    <>
      {error && <h2 className="form-error">{error}</h2>}
      {success && <h2 className="success-message">Signup/Login successful! You can now access your account.</h2>}
      <div className="member-section">
        <h2>{signUp ? 'Already a member?' : 'Not a member'}</h2>
        <button className="login-signup-button" type="button" onClick={handleClick}>
          {signUp ? 'Log In' : 'Sign Up'}
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
        {signUp && <SignupForm handleSubmit={handleFormSubmit} />}
        {!signUp && (
          <>
            <div  className="form-field">
              <label> Email </label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div  className="form-field">
              <label> Password </label>
              <input 
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
          </>
        )}
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
        <div id="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Authentication;
