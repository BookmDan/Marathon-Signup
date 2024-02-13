import { Container, Form, Button } from "react-bootstrap";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

const ShipPacket = () => {
  const [quantity, setQuantity] = useState(0); 
  const [quantityIncreased, setQuantityIncreased] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = () => {
    // setQuantity(prevQuantity => prevQuantity + 1);
    if (quantity > 0) {
      // If quantity is greater than 0, set the boolean to true and submit
      setQuantityIncreased(true);
    // Make a fetch post request to submit the race signup data to the backend
      fetch('/api/race-signups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: quantity,
            // Other race signup data...
        })
      })
      .then(response => {
        if (response.ok) {
            // Handle successful response
          console.log('Race signup submitted successfully.');
        } else {
            // Handle error response
          console.error('Error submitting race signup.');
        }
      })
      .catch(error => {
        console.error('Error submitting race signup:', error);
      });
    } else {
      setQuantityIncreased(false);
    }
    navigate('/shop')
  };
  return (
    <Container>
      <h2>Ship My Packet</h2>
      <p>
        Select this if you would like your packet shipped to you. The packet includes a shirt, bib, pins, and promotional swag. Please note that this option incurs a per-order cost and is not charged per household or address.
      </p>
      <p>
        Please double-check and confirm your shipping address before proceeding.
      </p>
      <p>
        *THIS IS A LIMITED CONVENIENCE SERVICE! (Skip traffic, fuel, time, and energy. Only first 1,000 packets will be shipped).
      </p>
      <p>
        Thank you.
      </p>
      <p>
        Ship my Packet - $25.00 
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Quantity:</Form.Label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(Number(e.target.value), 0))}
            max={1}
          />
        </Form.Group>
          <div id="button-container">
            <Button type="submit">Continue</Button>
          </div>
      </Form>
    </Container>
  );
};

export default ShipPacket;
