import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { getUserDetails, updateUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [rank, setRank] = useState("");
  const [campus, setCampus] = useState("");
  const [college, setCollege] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

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

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Changes has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        history.push("/users");
      } else {
        if (!user || user._id !== userId) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setIsAdmin(user.isAdmin);
          setPosition(user.position);
          setRank(user.rank);
          setCollege(user.college);
          setCampus(user.campus);
        }
      }
    } else {
      history.push("/");
    }
  }, [history, successUpdate, user, userId, dispatch, userInfo]);

  const submitHandler = () => {
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
        position,
        campus,
        college,
      })
    );
  };
  return (
    <FormContainer>
      <h1>Edit Employee</h1>

      <Link to='/employees'>
        <Button variant='outline-info' className='my-3'>
          Go back
        </Button>{" "}
      </Link>

      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant='danger'>{error}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId='name'>
            <Form.Label> Name </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={register({
                required: true,
              })}
              name='name'
            ></Form.Control>
            {errors.name?.type === "required" && (
              <p className='text-danger'>Name is required</p>
            )}
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label> Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={register({
                required: true,
              })}
              name='email'
            ></Form.Control>
            {errors.email?.type === "required" && (
              <p className='text-danger'>Email is required</p>
            )}
          </Form.Group>

          <Form.Group controlId='position'>
            <Form.Label> Position </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter position'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              ref={register({
                required: true,
              })}
              name='position'
            ></Form.Control>
            {errors.position?.type === "required" && (
              <p className='text-danger'>Position is required</p>
            )}
          </Form.Group>

          <Form.Group controlId='rank'>
            <Form.Label> Rank </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter rank'
              value={rank}
              disabled
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='college'>
            <Form.Label> College </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter college'
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              ref={register({
                required: true,
              })}
              name='college'
            ></Form.Control>
            {errors.college?.type === "required" && (
              <p className='text-danger'>College is required</p>
            )}
          </Form.Group>

          <Form.Group controlId='campus'>
            <Form.Label> Campus </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter campus'
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              ref={register({
                required: true,
              })}
              name='campus'
            ></Form.Control>
            {errors.campus?.type === "required" && (
              <p className='text-danger'>Campus is required</p>
            )}
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
            Edit
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UserEditScreen;
