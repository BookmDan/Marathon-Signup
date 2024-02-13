import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const PurchaseSummary = ({ event, tShirtSize, couponCode, baseCost }) => {
  const navigate = useNavigate()
  // Dummy data for demonstration
  const tShirtPrice = 0.00;
  const processingFee = 3.70;
  const totalCost = baseCost + tShirtPrice + processingFee;

  const handleContinueClick = () => {
    navigate('/purchase-summary')
  };

  const handleBackClick = () => {
    navigate('/shop')
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Purchase Summary</Card.Title>
          <Card.Text>
            <strong>Event:</strong> {event}
            <br />
            <strong>Item:</strong> T-shirt (Size: {tShirtSize})
            <br />
            <strong>Total:</strong> ${baseCost.toFixed(2)}
            <br />
            <strong>T-shirt:</strong> ${tShirtPrice.toFixed(2)}
            <br />
            <Form.Group controlId="couponCode" className="mt-3">
              <Form.Label>Coupon Code:</Form.Label>
              <Form.Control type="text" placeholder="Enter coupon code" />
            </Form.Group>
            <Button variant="primary">Apply</Button>
          </Card.Text>
          <hr />
          <Card.Text>
            <strong>Base Cost:</strong> ${baseCost.toFixed(2)}
            <br />
            <strong>Processing Fee:</strong> ${processingFee.toFixed(2)}
            <br />
            <strong>Total:</strong> ${totalCost.toFixed(2)}
          </Card.Text>
        </Card.Body>
      </Card>
      <div className="mt-4">
        <h5>Payment Method:</h5>
        <Button variant="secondary" className="me-2">Visa</Button>
        <Button variant="secondary" className="me-2">Mastercard</Button>
        <Button variant="secondary" className="me-2">Amex</Button>
        <Button variant="secondary" className="me-2">Discover</Button>
        {/* Credit card information goes here */}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div id="button-container">
          <Button variant="secondary" onClick={handleContinueClick}>Continue</Button>
        </div>
        <Button variant="secondary" onClick={handleBackClick}>Back</Button>
      </div>
    </>
  );
};

export default PurchaseSummary;
