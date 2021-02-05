import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserDetails,
  userUploadDoc,
  getUserDocuments,
  deleteDocument,
  userUpdateProfileDetails,
} from "../actions/userActions";
// import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { app } from "../base";
import dayjs from "dayjs";

import { Card, Form, Button, Table, Modal, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Message from "../components/Message";
import Loader from "../components/Loader";

const Profile = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userUploadDocument = useSelector((state) => state.userUploadDocument);
  const {
    loading: loadingDoc,
    error: errorDoc,
    success: successDoc,
  } = userUploadDocument;

  const userDocumentList = useSelector((state) => state.userDocumentList);
  const {
    documents,
    loading: loadingDocuments,
    error: errorDocuments,
  } = userDocumentList;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateProfile;

  const [idNumber, setIdNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [position, setPosition] = useState("");
  const [rank, setRank] = useState("");
  const [campus, setCampus] = useState("");
  const [college, setCollege] = useState("");
  const [leaveCredits, setLeaveCredits] = useState("");
  const [evalPoints, setEvalPoints] = useState("");
  const [absences, setAbsences] = useState("");
  const [program, setProgram] = useState("");
  // eslint-disable-next-line
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState("");

  const [show, setShow] = useState(false);
  const [type, setType] = useState("NBC");
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || Object.keys(user).length === 0) {
        dispatch(getUserDetails("profile"));
        dispatch(getUserDocuments());
      } else {
        setIdNumber(user.idNumber);
        setFirstname(user.firstname);
        setMiddlename(user.middlename);
        setLastname(user.lastname);
        setEmail(user.email);
        setDateHired(user.dateHired);
        setPosition(user.position);
        setRank(user.rank);
        setCampus(user.campus);
        setCollege(user.college);
        setLeaveCredits(user.leaveCredits);
        setAbsences(user.absences);
        setEvalPoints(user.evalPoints);
        setProgram(user.program);
      }

      // eslint-disable-next-line
      // if (user && user.idNumber) {
      // }
      // if (!user || !user.name || successUpdate) {
      //   dispatch({ type: USER_UPDATE_PROFILE_RESET });
      //   // dispatch(getUserDetails("profile"));

      //   if (successUpdate) {
      //     Swal.fire({
      //       position: "top-end",
      //       icon: "success",
      //       title: "Changes has been saved",
      //       showConfirmButton: false,
      //       timer: 1500,
      //     });
      //   }
      // } else {
      //   console.log("else");
      // }
    }
    // eslint-disable-next-line
  }, [history, userInfo, user, successDoc, successUpdate, dispatch]);

  const fileSubmitHandler = async (e) => {
    e.preventDefault();

    const file = e.target.docFile.files[0];

    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/pdf" ||
      file.type === "application/vnd.ms-excel"
    ) {
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();

      dispatch(
        userUploadDoc({
          name: file.name,
          type: type,
          url: fileUrl,
          userId: user._id,
        })
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your document has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      handleClose();
    } else {
      setMessage("Only .docx, .xls, .xlsx and .pdf file are allowed..");
      return;
    }
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

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (password === confirmPassword) {
      dispatch(userUpdateProfileDetails({ password }));
      setPassword("");
      setConfirmPassword("");
      setMessage("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Changes has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setMessage("Passwords do not match..");
      setPassword("");
      setConfirmPassword("");
      return;
    }
  };

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body>
          <h1 className='text-light'>Profile</h1>
          <hr className='bg-light' />

          <div className='px-5'>
            <h4 className='text-light'>Personal Information</h4>

            {error && <Message>{error}</Message>}

            {loading ? (
              <div className='my-3'>
                <Loader />
              </div>
            ) : (
              <div>
                <Form className='text-light' onSubmit={submitHandler}>
                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      ID Number:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Date Hired:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={dateHired}
                        onChange={(e) => setDateHired(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      First name:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={firstname}
                        disabled
                        onChange={(e) => setFirstname(e.target.value)}
                        className='text-white'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Email:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      Middle name:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={middlename}
                        disabled
                        onChange={(e) => setMiddlename(e.target.value)}
                        className='text-white'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Position:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={position}
                        disabled
                        onChange={(e) => setPosition(e.target.value)}
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      Last name:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={lastname}
                        disabled
                        onChange={(e) => setLastname(e.target.value)}
                        className='text-white'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Rank:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      Campus:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        value={campus}
                        disabled
                        onChange={(e) => setCampus(e.target.value)}
                        className='text-white'
                        type='text'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      College:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        disabled
                        className='text-white'
                        type='text'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      Total Leave Credits:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={leaveCredits}
                        onChange={(e) => setLeaveCredits(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Years of Service:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={dateHired}
                        onChange={(e) => setDateHired(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      Total Evaluation Points:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={evalPoints}
                        onChange={(e) => setEvalPoints(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Total Absences:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={absences}
                        onChange={(e) => setAbsences(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Program:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        disabled
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm='2'>
                      Password:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='text-black'
                      />
                    </Col>
                    <Form.Label column sm='2'>
                      Confirm Password:
                    </Form.Label>
                    <Col sm='4'>
                      <Form.Control
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='text-black'
                      />
                    </Col>
                  </Form.Group>
                  {message && (
                    <div className='mt-3 px-5'>
                      <Message>{message}</Message>
                    </div>
                  )}
                  {errorUpdate && (
                    <div className='mt-3 px-5'>
                      <Message>{errorUpdate}</Message>
                    </div>
                  )}
                  {loadingUpdate ? (
                    <Loader />
                  ) : (
                    <div className='text-center'>
                      <Button
                        type='submit'
                        className='btn btn-lg btn-info shadow-lg'
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </Form>
              </div>
            )}
          </div>

          <hr className='bg-light' />
          <div className='px-5'>
            <div className='d-flex justify-content-between text-light'>
              <h4>Documents</h4>
              <Button
                className='btn btn-lg btn-success shadow-lg'
                onClick={handleShow}
              >
                Upload document
              </Button>
            </div>

            {errorDocuments && (
              <div className='mt-3'>
                <Message>{errorDocuments}</Message>
              </div>
            )}

            {loadingDocuments ? (
              <Loader />
            ) : documents.length === 0 || documents === undefined ? (
              <div className='mt-3'>
                <Message variant='danger'>
                  You have no uploaded documents yet..
                </Message>
              </div>
            ) : (
              <Table striped bordered size='sm' variant='dark' className='mt-3'>
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Type</th>
                    <th>Date Uploaded</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => {
                    return (
                      <tr key={doc._id}>
                        <td>{doc.name}</td>
                        <td>{doc.type}</td>
                        <td>{dayjs(doc.createdAt).format("MMMM D, YYYY")}</td>
                        <td>
                          <a
                            href={doc.url}
                            download={doc.url}
                            target='_blank'
                            without='true'
                            rel='noreferrer'
                          >
                            <Button className='btn btn-sm btn-primary mr-2'>
                              Download
                            </Button>
                          </a>

                          <Button
                            onClick={() => deleteHandler(doc._id)}
                            className='btn btn-sm btn-danger'
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className='text-light'>
          <Modal.Title>Upload Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={fileSubmitHandler}>
            <Form.Group controlId='type'>
              <Form.Label className='text-white'>Document Type</Form.Label>
              <Form.Control
                as='select'
                onChange={(e) => setType(e.target.value)}
              >
                <option value='NBC'>NBC</option>
                <option value='PDS'>PDS</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.File
                id='exampleFormControlFile1'
                name='docFile'
                // onChange={onFileChange}
                label='Document'
                required
              />

              {message && (
                <div className='mt-3'>
                  <Message>{message}</Message>
                </div>
              )}

              {errorDoc && (
                <div className='mt-3'>
                  <Message>{errorDoc}</Message>
                </div>
              )}
            </Form.Group>
            <div className='text-center'>
              {loadingDoc ? (
                <Loader />
              ) : (
                <Button
                  type='submit'
                  className='btn-lg'
                  // onClick={handleClose}
                  variant='info'
                >
                  Upload
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <br />
      <br />
      <br />
    </div>
  );
};

export default Profile;
