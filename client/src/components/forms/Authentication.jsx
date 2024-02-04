import { useState } from 'react';
import SignupForm from './SignupForm'; 
import { useFormik } from 'formik';


function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();

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

  return (
    <>
      <h2 className="form-error"> {error}</h2>
      {success && <h2 style={{ color: 'green' }}>Signup successful! You can now log in.</h2>}
      <h2>Register </h2>
      <h2>{signUp ? 'Already a member?' : 'Not a member'}</h2>
      <button type="button" onClick={handleClick}>
        {signUp ? 'Log In' : 'Sign Up'}
      </button>
      {/* Render the SignupForm conditionally based on the signUp state */}
      <form onSubmit={formik.handleSubmit}>
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
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}
        </div>
        {signUp && <SignupForm updateUser={updateUser} />}
      </form>
    </>
  );
}

export default Authentication;
