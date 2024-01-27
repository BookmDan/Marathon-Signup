import React, { useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import LoginLoading from "./cards-lists-boxes/LoginLoading";

function Login({ onLogin }) {

  const [signupMode, setSignupMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      {isLoading? <LoginLoading />: ""}
      {signupMode? 
      <SignupForm signupMode={signupMode} setSignupMode={setSignupMode} onLogin={onLogin} setIsLoading={setIsLoading} /> : 
      <LoginForm 
        onLogin={onLogin} 
        setSignupMode={setSignupMode} 
        signupMode={signupMode}
        setIsLoading={setIsLoading} 
      />}
    </div>
  )
}

export default Login