import { Container, Row, Col, Button } from 'react-bootstrap';
import MerchCard from '../cards-boxes-search/MerchCard';
import babybib from "../../photos/shop/babybib.jpg"
import mug1 from "../../photos/shop/mug1.jpg"
import mug2 from "../../photos/shop/mug2.jpg"
import triathlete from "../../photos/shop/triathlete.jpg"
import triwrist from "../../photos/shop/triwrist.jpg"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useCost } from '../../context/CostContext';


const Shop = () => {
  const navigate = useNavigate()
  const { setCartItemsCost } = useCost();
  // Define shop items with their respective details
  const [shopItems, setShopItems] = useState([
    {
      name: 'T-shirt', imageUrl: triathlete, options: [
        { value: 's', label: 'Small' },
        { value: 'm', label: 'Medium' },
        { value: 'l', label: 'Large' },]
    },
    { name: 'Mug', imageUrl: mug1 },
    { name: 'Mug2', imageUrl: mug2 },
    { name: 'Baby Bib', imageUrl: babybib },
    { name: 'Wristband', imageUrl: triwrist },
  ]);

  const handleQuantityChange = (index, value) => {
    const newShopItems = [...shopItems];
    const newQuantity = newShopItems[index].quantity + parseInt(value);
    newShopItems[index].quantity = Math.max(Number(newQuantity, 0)); // Ensure the quantity doesn't go below 0
    setShopItems(newShopItems);
  };

  const handleContinueClick = () => {
    // navigate('/payment')
    navigate('/checkout-form')
  };

  const handleBackClick = () => {
    navigate('/ship-packet')
  };

  return (
    <Container>
      <h2>Shop</h2>
      <Row className="image-container row-cols-1 row-cols-md-2 row-cols-lg-3">
        {shopItems.map((item, index) => (
          <Col key={index} xs={12} sm={6} lg={4} className="mb-4">
            <MerchCard item={item} handleQuantityChange={handleQuantityChange} />
          </Col>
        ))}
      </Row>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div id="button-container">
          <Button variant="secondary" onClick={handleContinueClick}>Continue</Button>
        </div>
        <Button variant="secondary" onClick={handleBackClick}>Back</Button>
      </div>
    </Container>
  );
};
export default Shop;
//   return (
//     <Container>
//       <h2>Shop</h2>
//         <Row className="image-container row-cols-1 row-cols-md-2 row-cols-lg-3">
//           {shopItems.map((item, index) => (
//             <Col key={index} xs={12} sm={6} lg={4} className="mb-4">
//               <MerchCard item={item} />
//             </Col>
//           ))}
//         </Row>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div id="button-container">
//             <Button variant="secondary" onClick={handleContinueClick}>Continue</Button>
//           </div>
//             <Button variant="secondary" onClick={handleBackClick}>Back</Button>
//         </div>
//     </Container>
//   );
// };

