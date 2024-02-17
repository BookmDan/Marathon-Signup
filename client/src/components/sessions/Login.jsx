import { useState } from 'react';
import SignupForm from './SignupForm'; 
import LoginForm from './LoginForm'; 

function Login({ onLogin }) {
  const [signupMode, setSignupMode] = useState(false)

  return (
    <div>
    {signupMode ?
      <SignupForm 
        signupMode={signupMode} 
        setSignupMode={setSignupMode} 
        onLogin={onLogin} /> :
      <LoginForm
        setSignupMode={setSignupMode} 
        signupMode={signupMode}
        onLogin={onLogin} 
      /> }
    </div>
  );
}

export default Login;
