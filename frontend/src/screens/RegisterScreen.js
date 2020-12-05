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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // eslint-disable-next-line
  const [userType, setUserType] = useState(0);

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

    dispatch(register(name, email, password, isAdmin, userType));
  };

  return (
    <FormContainer>
      <h2>Create new user</h2>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label> Name </Form.Label>
          <Form.Control
            type='name'
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

        <Form.Group controlId='password'>
          <Form.Label> Password</Form.Label>
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

        <Form.Group controlId='userType'>
          <Form.Label>User Type</Form.Label>
          <Form.Control
            as='select'
            custom
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value={1}>Admin</option>
            <option value={2}>Staff</option>
            <option value={3}>Employee</option>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='secondary'>
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
