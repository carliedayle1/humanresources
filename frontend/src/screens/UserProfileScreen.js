import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { useForm } from "react-hook-form";
import {
  getUserDetails,
  userUpdateProfileDetails,
} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Swal from "sweetalert2";

const UserProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const { register, errors, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, success, user, userInfo]);

  const submitHandler = (e) => {
    setPassword("");
    setConfirmPassword("");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Updated successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(userUpdateProfileDetails({ id: user._id, name, email, password }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("document", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div>
      <Container>
        <h2>Profile Screen</h2>
        {error && <Message variant='danger'>{error}</Message>}
        <Row className='py-3'>
          <Col xs={12} md={4}>
            {loading ? (
              <Loader />
            ) : (
              <div>
                <Meta title={user.name} />
                <Card className='text-white bg-info shadow-lg'>
                  <Card.Header as='h5'>Personal Information</Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleSubmit(submitHandler)}>
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

                      <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Enter password again'
                          name='confirmPassword'
                          ref={register({
                            validate: (text) => text === password,
                          })}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                        {errors.confirmPassword && (
                          <Container className='mt-2 bg-danger rounded-lg'>
                            <p className='text-white '>
                              Passwords do not match
                            </p>
                          </Container>
                        )}
                      </Form.Group>

                      <Button type='submit' variant='secondary'>
                        Update
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
          <Col xs={12} md={8}>
            <Card className='text-white bg-success shadow-lg'>
              <Card.Header as='h5'>Documents</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId='image'>
                    <Form.Label> Document Upload </Form.Label>

                    <Form.File
                      id='image-file'
                      label={image ? image : "Choose file"}
                      custom
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfileScreen;
