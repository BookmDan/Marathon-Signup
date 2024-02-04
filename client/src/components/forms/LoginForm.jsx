import SignupForm from "./SignupForm";

function LoginForm({ onLogin,setSignupMode,  signupMode}) {

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

export default LoginForm;
