// import React, { useState, useRef } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { Form, Button, Col } from "react-bootstrap";
// import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'

// const lib = ['places']

// function SignupForm({ signupMode, setSignupMode, onLogin, setIsLoading }) {

//   const [errors, setErrors] = useState([])
//   const history = useHistory()

//   const addressRef = useRef()

//   const handleReturnClick = () => {
//       setSignupMode(!signupMode)
//   }

//   const {isLoaded} = useJsApiLoader({
//     libraries: lib,
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
//   })


// // note: I included address in here for now, we'll remove it and update the onSubmit function once 
// //  address validation is ready to be added
//   const formSchema = yup.object().shape({
//     username: yup.string().required("Please enter a username").max(20, "Username must be 20 characters or fewer"),
//     password: yup.string().required("Please enter a password").min(4, "Passwords need to be 4 characters or more"),
//     confirmPassword: yup.string().required("Please confirm password")
//   })

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//       confirmPassword: ""
//     },
//     validationSchema: formSchema,
//     validateOnChange: false,
//     validateOnBlur: false,
//     onSubmit: (values) => {
//       setIsLoading(true)
//       setErrors([])
//       if (formik.values.password === formik.values.confirmPassword){
      
//         fetch('/signup', {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify({...values, "address": addressRef.current.value}),
//         }).then(r => {
//           if (r.ok) {
//               r.json().then(user =>onLogin(user)) 
//               history.push('/')    
//           } else {
//               setIsLoading(false)
//               r.json().then(err => setErrors((currentErrors) => [...currentErrors, err.errors]))
//           }
//         })
//       } else {
//         setErrors((currentErrors) => [...currentErrors, "Password confirmation did not match"])
//       }
//     }
//   })

//   if (!isLoaded) {
//       return <h2 className='m-3' >loading</h2>
//     }

//   return (
//     <div>
//       <Button className="m-3 btn-dark"  onClick={handleReturnClick}>return to login</Button>
//       <Col lg="5" className="mx-auto">
//       <h3 className="m-3 text-info ">
//               Create a new Nordic Nexus account
//           </h3>
//       <Form onSubmit={formik.handleSubmit} >
//         <Form.Group className="form-floating w-50 m-3 " >
//           <Form.Control 
//             type="text" 
//             id="username" 
//             name="username"
//             placeholder="Username"
//             value={formik.values.username}
//             onChange={formik.handleChange}/>

//           <Form.Label>Username</Form.Label>
//           {formik.errors.username ? <div className="text-danger" >{formik.errors.username}</div> : ""}
//         </Form.Group>

//         <Form.Group className="form-floating w-50  m-3 " >
//           <Form.Control 
//             type="password" 
//             id="password" 
//             name="password" 
//             placeholder="password"  
//             value={formik.values.password}
//             onChange={formik.handleChange}/>

//           <Form.Label>Password</Form.Label>
//           {formik.errors.password ? <div className="text-danger" >{formik.errors.password}</div> : ""}
//         </Form.Group>

//         <Form.Group className="form-floating w-50 m-3 " >
//           <Form.Control 
//             type="password" 
//             id="confirmPassword" 
//             name="confirmPassword" 
//             placeholder="Confirm Password"  
//             value={formik.values.confirmPassword}
//             onChange={formik.handleChange}/>

//           <Form.Label>Confirm Password</Form.Label>
//           {formik.errors.confirmPassword ? <div className="text-danger" >{formik.errors.confirmPassword}</div> : ""}
//         </Form.Group>
        
          
//         <Autocomplete>
//         <Form.Group className="form-floating ms-3 " >
//           <Form.Control 
//             type="text" 
//             id="address" 
//             name="address" 
//             placeholder="address"
//             ref={addressRef}  
//             />
//           <Form.Label >Address</Form.Label>
//           {formik.errors.address ? <div className="text-danger" >{formik.errors.address}</div> : ""}
//         </Form.Group>
//         </Autocomplete>

//         <Form.Label className="ms-3 text-info" >We'll use this address to provide directions to your favorite Nordic centers.  
//             Providing a city and state without a street address works fine, too.</Form.Label>
        
//         <div className="d-flex" >
//           {errors.map((err) => (
//             <p className="text-danger m-3" key={err}>{err}</p>
//           ))}
//           <Button className="ms-auto btn-info " type="submit" >Sign up</Button>
//         </div>
//       </Form>
//       </Col>
//     </div>
//   )
// }

// export default SignupForm