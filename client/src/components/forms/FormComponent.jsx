import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const FormComponent = ({ signupMode, setSignupMode, onLogin }) => {
  return signupMode ? (
    <SignupForm setSignupMode={setSignupMode} onLogin={onLogin} />
  ) : (
    <LoginForm setSignupMode={setSignupMode} />
  );
};

export default FormComponent;
