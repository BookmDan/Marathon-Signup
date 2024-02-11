import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import autismImage from '../../photos/autism1.jpg';
import autismImage2 from '../../photos/autism2.jpeg';
import { useNavigate } from 'react-router-dom';



const TheWhy = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState('myself');
  const navigate = useNavigate()
  
  const handleDonationChange = (amount) => {
    setDonationAmount(amount);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCustomAmountChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/shipmypacket')
  }; 

  const handlePayment = (e) => {
    e.preventDefault();
    navigate('/payment')
  };

  const handleContinueClick = () => {
    navigate('/ship-packet')
  };

  const handleBackClick = () => {
    navigate('/agreement')
  };

  return (
    <div className="form-container">
      <h2>Raise for Autism Awareness</h2>
      <Container  className="container-custom">
        <Row className="mt-3">
          <Col className="image-container">
            <img src={autismImage} alt="Autism Awareness" className="img-fluid" />
            <img src={autismImage2} alt="Autism Awareness" className="img-fluid" />
          </Col>
          <Col>
            <h2>Donation Goal: $40,000</h2>
            <p>
              Autism is a complex neurological disorder that affects communication, social interaction,
              and behavior. It is a spectrum disorder, meaning symptoms can vary widely from person to person.
              The history of autism dates back to the early 20th century when it was first identified by
              researchers.
            </p>
            <p>
              Many individuals and organizations support autism awareness through events like marathons.
              Marathons provide an opportunity to raise funds, increase awareness, and show support for
              individuals and families affected by autism.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h3>Donate Now</h3>
            <Form onSubmit={handleSubmit}>
            <Form.Group id="button-container">
              <Button variant="primary" onClick={() => handleDonationChange(100)}>Donate $100</Button>
              <Button variant="primary" onClick={() => handleDonationChange(50)}>Donate $50</Button>
              <Button variant="primary" onClick={() => handleDonationChange(25)}>Donate $25</Button>
              <Button variant="primary" onClick={() => handleDonationChange(10)}>Donate $10</Button>
              <h3> Custom Amount</h3>
              <p>
                Enter a custom donation amount or select a donation level above.
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Control
                  type="number"
                  placeholder="Enter donation amount"
                  value={donationAmount}
                  onChange={handleCustomAmountChange}
                  style={{ marginRight: '10px' }} // Add margin to the right of the input
                />
                <Button variant="primary" type="submit" onClick={handlePayment}>Donate</Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="radio"
                label="On behalf of myself"
                value="myself"
                checked={selectedOption === 'myself'}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="On behalf of anonymous"
                value="anonymous"
                checked={selectedOption === 'anonymous'}
                onChange={handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="On behalf of other"
                value="other"
                checked={selectedOption === 'other'}
                onChange={handleOptionChange}
              />
            </Form.Group>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div id="button-container">
                  <Button variant="secondary" onClick={handleContinueClick}>Continue</Button>
              </div>
                <Button variant="secondary" onClick={handleBackClick}>Back</Button>
            </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TheWhy;
