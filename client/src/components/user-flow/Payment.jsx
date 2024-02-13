import { useFormik } from 'formik';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      credit_card_number: '',
      name_on_card: '',
      expiration_date: '',
      cvv: '',
      street_address: '',
      country: '',
      zipcode: '',
      city: '',
      state: '',
      save_my_card: false // Initial value for the checkbox
    },
    onSubmit: values => {
      // Handle form submission
      console.log(values);
    },
  });

  const handleContinueClick = () => {
    navigate('/purchase-summary')
  };

  const handleBackClick = () => {
    navigate('/shop')
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-field">
        <label>Credit Card Number</label>
        <input
          type="text"
          name="credit_card_number"
          value={formik.values.credit_card_number}
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-field">
        <label>Name on Card</label>
        <input
          type="text"
          name="name_on_card"
          value={formik.values.name_on_card}
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-field">
        <label>Expiration Date</label>
        <input
          type="text"
          name="expiration_date"
          value={formik.values.expiration_date}
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-field">
        <label>CVV</label>
        <input
          type="text"
          name="cvv"
          value={formik.values.cvv}
          onChange={formik.handleChange}
        />
      </div>
      <div className="form-field">
        <label>Street Address</label>
        <input
          type="text"
          name="street_address"
          value={formik.values.street_address}
          onChange={formik.handleChange}
        />
      </div>
      {/* Other address fields */}
      <div className="form-field">
        <label>
          <input
            type="checkbox"
            name="save_my_card"
            checked={formik.values.save_my_card}
            onChange={formik.handleChange}
          />
          Save my card
        </label>
      </div>
      <button type="submit">Submit</button>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div id="button-container">
          <Button variant="secondary" onClick={handleContinueClick}>Continue</Button>
        </div>
        <Button variant="secondary" onClick={handleBackClick}>Back</Button>
      </div>
    </form>
  );
};

export default Payment;