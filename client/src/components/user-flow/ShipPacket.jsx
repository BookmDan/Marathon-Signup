import { Container, Form } from "react-bootstrap";
import {useState} from 'react'

const ShipPacket = () => {
  const [quantity, setQuantity] = useState(0); 
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
      <Form>
        <Form.Group>
          <Form.Label>Quantity:</Form.Label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ShipPacket;
