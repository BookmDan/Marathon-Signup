import { useState } from "react";
import FormComponent from "./FormComponent";

function Login({ onLogin }) {
  const [signupMode, setSignupMode] = useState(false);
  // const [email, setEmail] = useState("");

  // const handleLogin = (user) => {
  //   onLogin(user);
  // }

  return (
    <div>
      {signupMode ? (
        <FormComponent signupMode={signupMode} setSignupMode={setSignupMode} onLogin={onLogin} />
      ) : (
        <FormComponent signupMode={signupMode} setSignupMode={setSignupMode} />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          })
            .then((r) => r.json())
            .then((user) => handleLogin(user));
        }}
      >
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login