import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { USER_REGISTER_RESET } from "../constants/userConstants";
import Swal from "sweetalert2";

const RegisterScreen = ({ history }) => {
  const [idNumber, setIdNumber] = useState("");
  const [position, setPosition] = useState("");
  const [college, setCollege] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345");
  const [isAdmin, setIsAdmin] = useState(false);

  // eslint-disable-next-line
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: currentUserInfo } = userLogin;

  useEffect(() => {
    if (currentUserInfo) {
      if (success) {
        dispatch({ type: USER_REGISTER_RESET });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User creation success",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/users");
      }

      if (!currentUserInfo.isAdmin) {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  }, [history, userInfo, currentUserInfo, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      register(idNumber, name, email, college, position, password, isAdmin)
    );
  };

  return (
    <FormContainer>
      <h2>Create new user</h2>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='idNumber'>
          <Form.Label> Id Number </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter id number'
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label> Name </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label> Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='college'>
          <Form.Label> College </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter college'
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='position'>
          <Form.Label> Position </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter position'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>
            {" "}
            Password (Note: The default password for all users is 12345){" "}
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='isAdmin'>
          <Form.Check
            type='switch'
            id='custom-switch'
            label='Is Admin?'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </Form.Group>

        <Button type='submit' variant='secondary'>
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
