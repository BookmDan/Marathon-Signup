// import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';

// const MerchCard = ({ item, handleQuantityChange }) => {
//   return (
//     <Card>
//       <Card.Body>
//         <Card.Title>{item.name}</Card.Title>
//         <Card.Text>
//           Price: ${item.price}
//         </Card.Text>
//         <InputGroup className="mb-3">
//           {/* <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.id - 1, -1)}>
//             -
//           </Button> */}
//           <FormControl
//             type="number"
//             value={item.quantity}
//             onChange={(e) => handleQuantityChange(item.id - 1, e.target.value)}
//           />
//           {/* <Button variant="outline-secondary" onClick={() => handleQuantityChange(item.id - 1, 1)}>
//             +
//           </Button> */}
//         </InputGroup>
//       </Card.Body>
//     </Card>
//   );
// };

// export default MerchCard;


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