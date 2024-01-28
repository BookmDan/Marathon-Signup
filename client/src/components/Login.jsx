import { useState } from "react";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

function Login({ onLogin }) {
  const [signupMode, setSignupMode] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (user) => {
    onLogin(user);
  }


  return (
    <div>
      {signupMode ? (
        <SignupForm
          signupMode={signupMode}
          setSignupMode={setSignupMode}
          onLogin={handleLogin}
        />
      ) : (
        <LoginForm
          onLogin={handleLogin}
          setSignupMode={setSignupMode}
          signupMode={signupMode}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
          })
            .then((r) => r.json())
            .then((user) => handleLogin(user));
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login