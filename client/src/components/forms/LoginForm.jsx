import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login({ onLogin }) {
  const [signupMode, setSignupMode] = useState(false);

  return (
    <div>
      {signupMode ? (
        <SignupForm
          signupMode={signupMode}
          setSignupMode={setSignupMode}
          onLogin={onLogin}
        />
      ) : (
        <LoginForm
          onLogin={onLogin}
          setSignupMode={setSignupMode}
          signupMode={signupMode}
        />
      )}
    </div>
  );
}

export default Login;
