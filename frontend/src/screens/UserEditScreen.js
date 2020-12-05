import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { getUserDetails, updateUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // eslint-disable-next-line
  const [userType, setUserType] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successUpdate) {
        dispatch({
          type: USER_UPDATE_RESET,
        });

        history.push("/users");
      } else {
        if (!user.name || user._id !== userId) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
          setUserType(user.userType);
        }
      }
    } else {
      history.push("/");
    }
  }, [history, successUpdate, user, userId, dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
        userType,
      })
    );
  };
  return (
    <FormContainer>
      <h1>Edit user</h1>

      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{error}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
            Edit
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UserEditScreen;
