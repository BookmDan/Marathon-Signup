import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
// { handleSubmit }
const SignupForm = () => {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    phoneNumber: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Please confirm password").oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: formSchema,
    onSubmit:(values) => {
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Signup success:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Signup error:', error);
      });
    },
  });
      
      
      // handleSubmit,
  // });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-field">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="form-error">{formik.errors.firstName}</div>
        )}
      </div>

      <div className="form-field">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="form-error">{formik.errors.lastName}</div>
        )}
      </div>

      <div className="form-field">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="form-error">{formik.errors.email}</div>
        )}
      </div>

      <div className="form-field">
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className="form-error">{formik.errors.phoneNumber}</div>
        )}
      </div>

      <div className="form-field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="form-error">{formik.errors.password}</div>
        )}
      </div>
    </form>
  );
};

export default SignupForm;
