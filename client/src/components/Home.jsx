import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";

function Home() {
  const [userData, setUserData] = useState(null);
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetch("/users") // Adjust the endpoint as needed
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error fetching user data");
          }
        })
        .then((data) => setUserData(data))
        .catch((error) => {
          // Handle errors, e.g., redirect to login page
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {user && (
        <div>
          <p>Hello, {user.username}!</p>
          {/* Display user-specific data here */}
          {userData && (
            <div>
              <h2>User Data</h2>
              {/* Display user data */}
              {/* Example: <p>Email: {userData.email}</p> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
