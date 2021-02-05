import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userActions";

import {
  Form,
  Button,
  Container,
  Image,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Container style={{ marginTop: "10%" }} className='text-light'>
      <Row>
        <Col sm={12} md={12} lg={12} className='d-flex justify-content-center'>
          <Image
            src='/images/logo.png'
            roundedCircle
            height={130}
            width={130}
            className='bg-dark'
          />
        </Col>

        <Col
          sm={12}
          md={12}
          lg={12}
          className='d-flex justify-content-center mt-3'
        >
          <Form style={{ width: "50%" }} onSubmit={submitHandler}>
            <Card>
              <Card.Body>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text> */}
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                {error && (
                  <div className='mt-3'>
                    <Message>{error}</Message>
                  </div>
                )}
                {/* <Form.Group controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group> */}
                {loading ? (
                  <Loader />
                ) : (
                  <div className='text-center'>
                    <Button variant='info' type='submit'>
                      Enter
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;

// import React, { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";
// import { login } from "../actions/userActions";
// import { useForm } from "react-hook-form";

// const LoginScreen = ({ location, history }) => {
//   const [idNumber, setIdNumber] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const { register, errors, handleSubmit } = useForm();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { loading, error, userInfo } = userLogin;

//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   useEffect(() => {
//     if (userInfo) {
//       history.push(redirect);
//     }
//   }, [history, userInfo, redirect]);

//   const submitHandler = (e) => {
//     dispatch(login(idNumber, password));
//   };

//   return (
//     <FormContainer>
//       <h1>Sign In</h1>
//       {error && <Message variant='danger'>{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={handleSubmit(submitHandler)} noValidate>
//         <Form.Group controlId='email'>
//           <Form.Label>ID Number or Email</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Enter id number'
//             value={idNumber}
//             // name='idNumber'
//             // ref={register({
//             //   required: true,
//             //   pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
//             // })}
//             onChange={(e) => setIdNumber(e.target.value)}
//           ></Form.Control>
//           {/* {errors.email?.type === "required" && (
//             <p className='text-danger mt-1'>Email is required</p>
//           )}{" "} */}
//           {/* {errors.email?.type === "pattern" && (
//             <p className='text-danger mt-1'>Email must be a valid email</p>
//           )} */}
//         </Form.Group>

//         <Form.Group controlId='password'>
//           <Form.Label> Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Enter password'
//             value={password}
//             name='password'
//             ref={register({ required: true })}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//           {errors.password && (
//             <p className='text-danger mt-1'>Password is required</p>
//           )}
//         </Form.Group>

//         <Button type='submit' variant='secondary'>
//           Log In
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default LoginScreen;
