// import { useState } from "react";
// // import LoginForm from "./forms/LoginForm";
// // import SignupForm from "./forms/SignupForm";
// // import LoginLoading from "./cards-lists-boxes/LoginLoading";

// function Login({ onLogin }) {
//   const [username, setUsername] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch("/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username }),
//     })
//       .then((r) => r.json())
//       .then((user) => onLogin(user));
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }
// //   const [signupMode, setSignupMode] = useState(false)
// //   const [isLoading, setIsLoading] = useState(false)

// //   return (
// //     <div>
// //       {isLoading? <LoginLoading />: ""}
// //       {signupMode? 
// //       <SignupForm signupMode={signupMode} setSignupMode={setSignupMode} onLogin={onLogin} setIsLoading={setIsLoading} /> : 
// //       <LoginForm 
// //         onLogin={onLogin} 
// //         setSignupMode={setSignupMode} 
// //         signupMode={signupMode}
// //         setIsLoading={setIsLoading} 
// //       />}
// //     </div>
// //   )
// // }

// export default Login