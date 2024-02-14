import { useTotalCost } from './TotalCostContext';

const TotalCost = () => {
  const { totalCost } = useTotalCost();

  return <div>Total Cost: {totalCost}</div>;
};

export default TotalCost;
