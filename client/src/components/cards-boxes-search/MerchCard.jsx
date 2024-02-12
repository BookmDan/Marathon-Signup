import { Card, Button, Form } from 'react-bootstrap';

const MerchCard = ({ item }) => {
  // Destructure the item object to extract relevant properties
  const { name, imageUrl, options } = item;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Form.Select aria-label="Select option">
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </Form.Select>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default MerchCard;
