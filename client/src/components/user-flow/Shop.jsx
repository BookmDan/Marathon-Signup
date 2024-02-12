import { Container, Row, Col } from 'react-bootstrap';
import MerchCard from '../cards-boxes-search/MerchCard';
import babybib from "../../photos/shop/babybib.jpg"
import mug1 from "../../photos/shop/mug1.jpg"
import mug2 from "../../photos/shop/mug2.jpg"
import triathlete from "../../photos/shop/triathlete.jpg"
import triwrist from "../../photos/shop/triwrist.jpg"


const Shop = () => {
  
  // Define shop items with their respective details
  
  const shopItems = [
    {
      name: 'T-shirt',
      // imageUrl:  "../../photos/shop/triathlete.jpg",
      options: [
        { value: 's', label: 'Small' },
        { value: 'm', label: 'Medium' },
        { value: 'l', label: 'Large' },
      ]
    },
    // Add more items as needed
  ];
  // const shopItems = [
  //   { name: 'T-shirt', imageUrl: triathlete, options: ['Small', 'Medium', 'Large'] },
  //   { name: 'Mug', imageUrl: [mug1, mug2] },
  //   { name: 'Baby Bib', imageUrl: babybib },
  //   { name: 'Wristband', imageUrl: triwrist },
  // ];

  return (
    <Container>
      <h2>Shop</h2>
      <Col className="image-container">
        <img src={babybib}/>
        <img src={mug1}/>
        <img src={mug2}/>
        <img src={triwrist}/>
        <img src={triathlete} />
      </Col>
      <Row>
        {shopItems.map((item, index) => (
          <Col key={index}>
            <MerchCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shop;
