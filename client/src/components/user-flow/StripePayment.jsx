// import { useEffect, useState } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';
// import { loadStripe } from '@stripe/stripe-js';

// const StripePayment = () => {
//   const [stripePromise, setStripePromise] = useState(null);

//   useEffect(() => {
//     const fetchPublishableKey = async () => {
//       const response = await fetch('/config');
//       const { publishableKey } = await response.json();
//       setStripePromise(loadStripe(publishableKey));
//     };

//     fetchPublishableKey();
//   }, []);

//   return (
//     <div>
//       <h1>Payment Page</h1>
//       {stripePromise && (
//         <Elements stripe={stripePromise}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default StripePayment;
