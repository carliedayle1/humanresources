import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Swal from "sweetalert2";

import {
  getUserDetails,
  userUpdateProfileDetails,
} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const UserProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [leaveCredits, setLeaveCredits] = useState(0);
  const [position, setPosition] = useState("");
  const [rank, setRank] = useState("");
  const [campus, setCampus] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user || !user.name || successUpdate) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));

        if (successUpdate) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Changes has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        setName(user.name !== undefined ? user.name : "");
        setEmail(user.email !== undefined ? user.email : "");
        setIdNumber(user.idNumber !== undefined ? user.idNumber : "");
        setLeaveCredits(
          user.leaveCredits !== undefined ? user.leaveCredits : 0
        );
        setDateHired(
          user.dateHired === undefined
            ? ""
            : dayjs(user.dateHired).format("MMMM D, YYYY")
        );
        setPosition(user.position !== undefined ? user.position : "");
        setRank(user.rank !== undefined ? user.rank : "");
        setCampus(user.campus !== undefined ? user.campus : "");
        setCollege(user.college !== undefined ? user.college : "");
      }
    }
  }, [dispatch, history, userInfo, user, successUpdate]);

  const submitHander = () => {
    dispatch(userUpdateProfileDetails({ name, email, password }));
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <h1>Profile</h1>

      <Container className='bg-light rounded-lg mt-3 p-4'>
        {loading && <Loader />}
        {loadingUpdate && <Loader />}
        <h4>Personal Information</h4>
        {error && <Message variant='danger'>{error}</Message>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        <Form onSubmit={handleSubmit(submitHander)}>
          <Form.Group as={Row} controlId='info0'>
            <Form.Label column sm='2'>
              ID Number
            </Form.Label>
            <Col sm='2'>
              <Form.Control plaintext readOnly value={idNumber} disabled />
            </Col>
            <Form.Label column sm='2'>
              Date Hired
            </Form.Label>
            <Col sm='2'>
              <Form.Control plaintext readOnly value={dateHired} />
            </Col>
            <Form.Label column sm='2'>
              Total Leave Credits
            </Form.Label>
            <Col sm='2'>
              <Form.Control plaintext readOnly value={leaveCredits} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='info1'>
            <Form.Label column sm='1'>
              Name
            </Form.Label>
            <Col sm='5'>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={register({
                  required: true,
                })}
                name='name'
              />
              {errors.name?.type === "required" && (
                <p className='text-danger m-0'>Name is required</p>
              )}
            </Col>
            <Form.Label column sm='1'>
              Email
            </Form.Label>
            <Col sm='5'>
              <Form.Control
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={register({
                  required: true,
                })}
                name='email'
              />
              {errors.email?.type === "required" && (
                <p className='text-danger m-0'>Email is required</p>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='info2'>
            <Form.Label column sm='1'>
              Position
            </Form.Label>
            <Col sm='5'>
              <Form.Control
                type='text'
                value={position}
                disabled
                onChange={(e) => setPosition(e.target.value)}
              />
            </Col>
            <Form.Label column sm='1'>
              Rank
            </Form.Label>
            <Col sm='5'>
              <Form.Control type='text' value={rank} disabled />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='info2'>
            <Form.Label column sm='1'>
              Campus
            </Form.Label>
            <Col sm='5'>
              <Form.Control type='text' value={campus} disabled />
            </Col>
            <Form.Label column sm='1'>
              College
            </Form.Label>
            <Col sm='5'>
              <Form.Control type='text' value={college} disabled />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='info2'>
            <Form.Label column sm='2'>
              Password
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Form.Label column sm='2'>
              Confirm Password
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                ref={register({
                  validate: (value) => value === password,
                })}
                name='confirmPass'
              />
              {errors.confirmPass?.type === "validate" && (
                <p className='text-danger m-0'>Passwords do not match</p>
              )}
            </Col>
          </Form.Group>

          <Button type='submit' variant='info'>
            Edit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserProfileScreen;
