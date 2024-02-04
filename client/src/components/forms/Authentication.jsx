import { useState } from 'react';
import SignupForm from './SignupForm'; // Import the SignupForm component
// import { useNavigate } from 'react-router-dom';

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
      {signUp && <SignupForm updateUser={updateUser} />}
    </>
  );
}

export default Authentication;
