// import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  // const user = useSelector((state) => state.auth);

  const handleCheckout = () => {
    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        userId: user._id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
      });
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;