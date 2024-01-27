// import React, { useState} from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { Form, Button, Col } from "react-bootstrap";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// function LoginForm({ onLogin, setSignupMode, signupMode, setIsLoading }) {

//     const [errors, setErrors] = useState([])
//     const history = useHistory()

//     const handleSignupClick = () => {
//         setSignupMode(!signupMode)
//     }

//     const formSchema = yup.object().shape({
//         username: yup.string().required("Please enter a username").max(20, "Username must be 20 characters or fewer"),
//         password: yup.string().required("Please enter a password")
//     })

//     const formik = useFormik({
//         initialValues: {
//             username: "",
//             password: ""
//         },
//         validationSchema: formSchema,
//         validateOnChange: false,
//         validateOnBlur: false,
//         onSubmit: (values) => {
//             setIsLoading(true)
//             setErrors([])
//             fetch("/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//             }).then(r => {
//                 if (r.ok) {
                    
//                     r.json().then(user =>onLogin(user))
                     
//                     history.push('/')    
//                 } else {
//                     r.json().then(err => {
//                         setIsLoading(false)
//                         console.log(err.errors)
//                         setErrors(err.errors)
//                     })
//                 }
//             })
//         }
//     })


//     return (
//         <div>
//             <Col lg="5" className="mx-auto">
//                 <h3 className="m-5">
//                     Please log in to view page
//                 </h3>    
//                 <Form className="m-4" onSubmit={formik.handleSubmit} >
//                     <Form.Group className="m-3 form-floating" >
//                         <Form.Control 
//                             type="username" 
//                             name="username" 
//                             id="username" 
//                             placeholder="Username"
//                             value={formik.values.username}
//                             onChange={formik.handleChange}  
//                         />
//                         <Form.Label >Username</Form.Label>
//                         {formik.errors.username ? <div className="text-danger" >{formik.errors.username}</div> : ""}
//                     </Form.Group>
                
//                     <Form.Group className="m-3 form-floating" >
//                         <Form.Control 
//                             type="password" 
//                             name="password" 
//                             id="password" 
//                             placeholder="Password"
//                             value={formik.values.password}
//                             onChange={formik.handleChange} 
//                         />
//                         <Form.Label>Password</Form.Label>
//                         {formik.errors.password ? <div className="text-danger" >{formik.errors.password}</div> : ""}
//                     </Form.Group>
//                     {errors.map((err) => (
//                         <p className="text-danger m-3" key={err}>{err}</p>
//                     ))}

//                     {/* <p className="text-danger m-3"> {formik.errors.username}</p>
//                     <p className="text-danger m-3"> {formik.errors.password}</p> */}

//                     <Button className="m-3" variant="primary" type="submit">
//                         Log In
//                     </Button>
//                 </Form>
//                 <div className="ms-4">
//                     <Button className="m-3 btn-dark" onClick={handleSignupClick} >Click here to create an account</Button>
//                 </div>
//             </Col>
//         </div>
//     )
// }

// export default LoginForm