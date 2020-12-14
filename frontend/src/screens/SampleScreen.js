import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Container,
  Table,
} from "react-bootstrap";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { useForm } from "react-hook-form";
import {
  getUserDetails,
  userUpdateProfileDetails,
  userUploadDoc,
  getUserDocuments,
  deleteDocument,
} from "../actions/userActions";
// eslint-disable-next-line
import {
  USER_UPDATE_PROFILE_RESET,
  USER_UPLOAD_DOCUMENT_RESET,
  USER_DELETE_DOCUMENT_RESET,
} from "../constants/userConstants";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const SampleScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  // eslint-disable-next-line
  const [documentType, setDocumentType] = useState("NBC");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");
  const [uploading, setUploading] = useState(false);

  const { register, errors, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userUploadDocument = useSelector((state) => state.userUploadDocument);
  const {
    loading: loadingUpload,
    success: successUpload,
    error: errorUpload,
  } = userUploadDocument;

  const userDocumentList = useSelector((state) => state.userDocumentList);
  const {
    documents,
    loading: loadingDocumentList,
    error: errorDocumentList,
  } = userDocumentList;

  const userDeleteDocument = useSelector((state) => state.userDeleteDocument);
  const {
    loading: loadingDeleteDocument,
    success: successDeleteDocument,
  } = userDeleteDocument;

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
  }, [
    history,
    dispatch,
    success,
    user,
    userInfo,
    successUpload,
    documents,
    successDeleteDocument,
  ]);

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

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDocument(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.document[0];
    // const file = e.target.files[0];

    const formData = new FormData();
    formData.append("document", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload/document",
        formData,
        config
      );

      setUploading(false);

      dispatch(
        userUploadDoc({
          name: userInfo.name,
          url: data,
          type: documentType,
          userId: user._id,
        })
      );
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

                      <Form.Group controlId='position'>
                        <Form.Label> Position</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter position'
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
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
                {loadingUpload ? (
                  <Loader color='text-white' />
                ) : (
                  <Form onSubmit={handleSubmit(uploadFileHandler)}>
                    <Form.Group controlId='type'>
                      <Form.Label>Document Type</Form.Label>
                      <Form.Control
                        as='select'
                        onChange={(e) => setDocumentType(e.target.value)}
                      >
                        <option value='NBC'>NBC</option>
                        <option value='PDS'>PDS</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                      <Form.Label> Document Upload </Form.Label>

                      <Form.File
                        id='image-file'
                        label={document ? document : "Choose file"}
                        custom
                        ref={register({
                          validate: (value) => {
                            return (
                              value[0].type ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                              value[0].type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                              value[0].type === "application/vnd.ms-excel"
                            );
                          },
                          required: true,
                        })}
                        name='document'
                        onChange={(e) => setDocument(e.target.files[0].name)}
                      ></Form.File>

                      {uploading && <Loader />}
                    </Form.Group>
                    {errors.document && (
                      <Message variant='danger'>
                        {errors.document?.type === "required" && (
                          <div>File input is required</div>
                        )}
                        {errors.document?.type === "validate" && (
                          <div>docx, xlsx and xls files only</div>
                        )}
                      </Message>
                    )}

                    <Button
                      type='submit'
                      variant='secondary'
                      className='shadow-lg '
                    >
                      Upload
                    </Button>

                    {errorUpload && (
                      <Message variant='danger'>{errorUpload}</Message>
                    )}
                  </Form>
                )}

                {errorDocumentList && (
                  <Message variant='danger'>{errorDocumentList}</Message>
                )}
                {loadingDocumentList ? (
                  <Loader color='text-warning' />
                ) : (
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className='bg-white rounded-lg mt-3'
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date Uploaded</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents &&
                        documents.map((doc) => {
                          return (
                            <tr key={doc._id}>
                              <td>{doc.name}</td>
                              <td>{doc.type}</td>
                              <td>
                                {dayjs(doc.createdAt).format("MMMM D, YYYY")}
                              </td>

                              <td>
                                <Button
                                  variant='warning'
                                  className='btn-sm mr-2'
                                >
                                  <i className='fas fa-file-download text-white'></i>
                                </Button>
                                <Button variant='info' className='btn-sm mr-2'>
                                  <i className='fas fa-edit'></i>
                                </Button>
                                <Button
                                  variant='danger'
                                  className='btn-sm'
                                  onClick={() => deleteHandler(doc._id)}
                                >
                                  <i className='fas fa-trash-alt '></i>
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SampleScreen;