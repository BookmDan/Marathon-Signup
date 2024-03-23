import { Card, Button, Form } from 'react-bootstrap';
import { useCost } from '../../context/CostContext'; 
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useCreditCard } from '../../context/CreditCardContext';
import StripePayButton from './StripePayButton'
// import { loadStripe } from '@stripe/stripe-js'

const PurchaseSummary = () => {
  const navigate = useNavigate();
  // const cart = useSelector((state)=> state.AddToCart)
  const { creditCardInfo } = useCreditCard();
  const { selectedRaceCost, shipPacketCost, cartItemsCost } = useCost(); // Access the cost-related state from the CostContext
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Calculate total cost
  const baseCost = selectedRaceCost + shipPacketCost + cartItemsCost;
  const tShirtPrice = 0.00; // Assuming a fixed price for the T-shirt
  const processingFee = 3.70; // Assuming a fixed processing fee
  const totalCost = baseCost + tShirtPrice + processingFee;

  const handleConfirmClick = () => {
    navigate('/thank-you');
  };

  // const makePayment = async () => {
  //   const stripe = await loadStripe('pk_live_7jQQpcNJkz1J0az04iZTLZSD')

  //   const body = {
  //     products:cart
  //   }
  
  //   const headers = {
  //     "Content-Type": "application/json"
  //   }

  //   const response = await fetch(`${apiURL}/create-checkout-session`, {
  //     method: "POST",
  //     headers: headers,
  //     body:JSON.stringify(body)
  //   })
  //   const session = await response.json()
  //   const result = stripe.redirectToCheckout({
  //     sessionId:session.id
  //   })
  //   if (result.error) {
  //     console.log(result.error)
  //   }
  // }

  const handleBackClick = () => {
    navigate('/payment');
  };

  const handlePaymentMethodClick = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  return (
    <>
      <div>
        <Card>
          <Card.Body>
            <Card.Title className="customTitle">Purchase Summary</Card.Title>
            <Card.Text>
              <strong>Selected Race Cost:</strong> ${selectedRaceCost.toFixed(2)}
              <br />
              <strong>Ship Packet Cost:</strong> ${shipPacketCost.toFixed(2)}
              <br />
              <strong>Cart Items Cost:</strong> ${cartItemsCost.toFixed(2)}
              <br />
              <strong>Base Cost:</strong> ${baseCost.toFixed(2)}
              <br />
              <strong>T-shirt:</strong> ${tShirtPrice.toFixed(2)}
              <br />
              <Form.Group controlId="couponCode" className="mt-3">
                <Form.Label>Coupon Code:</Form.Label>
                <Form.Control type="text" placeholder="Enter coupon code" />
              </Form.Group>
              <Button variant="primary">Apply</Button>
              <br />
              <strong>Processing Fee:</strong> ${processingFee.toFixed(2)}
              <br />
              <strong>Total:</strong> ${totalCost.toFixed(2)}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="mt-4">
        <h5>Payment Method:</h5>
        {creditCardInfo && (
        <Button
          variant="primary"
          onClick={() => handlePaymentMethodClick(creditCardInfo.name_on_card)}
          className={selectedPaymentMethod === creditCardInfo.name_on_card ? 'highlighted-blue me-2' : 'me-2'}
          >
          {creditCardInfo.name_on_card && `${creditCardInfo.name_on_card}'s Credit Card`}
        </Button>
        )}
        <div className="mt-4">
          <Button variant="primary" as={Link} to="/stripe-payment">Proceed to Payment</Button>
        </div>
        <div className="mt-4">
          <StripePayButton />
        </div>
        <Button
          variant="secondary"
          onClick={() => handlePaymentMethodClick('Visa')}
          className={selectedPaymentMethod === 'Visa' ? 'highlighted-blue me-2' : 'me-2'}
        >
          Visa
        </Button>
        <Button variant="secondary" className="me-2">Mastercard</Button>
        <Button variant="secondary" className="me-2">Amex</Button>
        <Button variant="secondary" className="me-2">Discover</Button>
        {/* Credit card information goes here */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div id="button-container">
          {/* <StripePayButton/> */}
          <Button variant="secondary" onClick={handleConfirmClick}>Confirm Payment ${totalCost.toFixed(2)} </Button>
        </div>
        <Button variant="secondary" onClick={handleBackClick}>Back</Button>
      </div>
    </>
  );
};

export default PurchaseSummary;
