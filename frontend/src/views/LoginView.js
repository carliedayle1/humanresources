import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Loader from "../components/Loader";
import Message from "../components/Message";

const LoginView = ({ location, history }) => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(login(idNumber, password));

    // alert("hello");
  };

  return (
    <Container style={{ marginTop: "13%" }} className='text-light'>
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
                  <Form.Label>Email address / Id Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter email'
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
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

                  {error && (
                    <div className='mt-3'>
                      <Message>{error}</Message>
                    </div>
                  )}
                </Form.Group>

                {/* <Form.Group controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group> */}

                {loading ? (
                  <Loader />
                ) : (
                  <Button variant='info' type='submit'>
                    Submit
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;
