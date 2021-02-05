import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  //   getUserRanks,
  getEmployeeDocuments,
  getUserDetails,
} from "../../actions/userActions";
import dayjs from "dayjs";

const EmployeeProfile = ({ history, match }) => {
  const empId = match.params.id;

  const oldUser = useRef();
  const dispatch = useDispatch();

  //   const [showRank, setShowRank] = useState(false);

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  //   const userRank = useSelector((state) => state.userRank);
  //   const { ranks, loading: loadingRanks, error: errorRanks } = userRank;

  const userDocuments = useSelector((state) => state.userDocuments);
  const {
    documents,
    loading: loadingDocuments,
    error: errorDocuments,
  } = userDocuments;

  if (error) {
    history.push("/employees");
  }

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (
        !user ||
        user._id === undefined ||
        Object.keys(user).length === 0 ||
        oldUser.current !== empId
      ) {
        dispatch(getUserDetails(empId));
        oldUser.current = empId;
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
        // setName(user.name);
        // setIdNumber(user.idNumber);
        // setEmail(user.email);
        // setPosition(user.position);
        // setRank(user.rank);
        // setDateHired(dayjs(user.dataHired).format("MMMM D, YYYY"));
        // setCredits(user.leaveCredits);
        // setCampus(user.campus);
        // setCollege(user.college);
        // console.log(user.leaveCredits);

        // dispatch(getUserRanks(empId));
        dispatch(getEmployeeDocuments(empId));
      }
    }
    // eslint-disable-next-line
  }, [userInfo, history, dispatch, user]);

  //   const showRankHandler = () => {
  //     setShowRank(!showRank);
  //   };

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body>
          <h1 className='text-light'>Employee Profile</h1>
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
                <Form className='text-light'>
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

                  {/* <div className='text-center'>
                      <Button
                        type='submit'
                        className='btn btn-lg btn-info shadow-lg'
                      >
                        Update
                      </Button>
                    </div> */}
                </Form>
              </div>
            )}
          </div>

          <hr className='bg-light' />
          <div className='px-5'>
            <div className='d-flex justify-content-between text-light'>
              <h4>Documents</h4>
              {/* <Button
                className='btn btn-lg btn-success shadow-lg'
                onClick={handleShow}
              >
                Upload document
              </Button> */}
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

                          {/* <Button
                            onClick={() => deleteHandler(doc._id)}
                            className='btn btn-sm btn-danger'
                          >
                            Delete
                          </Button> */}
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

      {/* <Modal show={show} onHide={handleClose} centered>
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
      </Modal> */}

      <br />
      <br />
      <br />
    </div>
  );

  //   return (
  //     <>
  //       <h1>Employee Profile</h1>
  //       <Link to='/employees'>
  //         {" "}
  //         <Button variant='outline-info' className='my-3'>
  //           Go back
  //         </Button>
  //       </Link>
  //       {error && <Message variant='danger'>{error}</Message>}

  //       {loading ? (
  //         <Loader />
  //       ) : (
  //         <Container className='bg-light rounded shadow-lg p-4'>
  //           <h3>Personal Information</h3>

  //           <Row className='my-3 px-4'>
  //             <Col sm={12} md={6}>
  //               <Card body className='bg-info shadow text-light '>
  //                 <Row>
  //                   <Col md={4}>
  //                     <h5>ID Number:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{idNumber}</strong>
  //                     </h5>
  //                   </Col>
  //                   <Col md={4}>
  //                     <h5>Name:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{name}</strong>
  //                     </h5>
  //                   </Col>
  //                   <Col md={4}>
  //                     <h5>Email:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{email}</strong>
  //                     </h5>
  //                   </Col>
  //                   <Col md={4}>
  //                     <h5>Position:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{position}</strong>
  //                     </h5>
  //                   </Col>
  //                   <Col md={4}>
  //                     <h5>Rank:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{rank}</strong>
  //                     </h5>
  //                   </Col>
  //                 </Row>
  //               </Card>
  //             </Col>

  //             <Col sm={12} md={6}>
  //               <Card body className='bg-secondary shadow text-light '>
  //                 <Row>
  //                   <Col md={4}>
  //                     <h5>Date Hired:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{dayjs(dateHired).format("MMMM D, YYYY")}</strong>
  //                     </h5>
  //                   </Col>
  //                   <Col md={4}>
  //                     <h5>Total Leave Credits:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{credits}</strong>
  //                     </h5>
  //                   </Col>
  //                   <Col md={4}>
  //                     <h5>Campus:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{campus}</strong>
  //                     </h5>
  //                   </Col>
  //                   <Col md={4}>
  //                     <h5>College:</h5>
  //                   </Col>
  //                   <Col md={8}>
  //                     <h5>
  //                       <strong>{college}</strong>
  //                     </h5>
  //                   </Col>
  //                 </Row>
  //               </Card>
  //             </Col>
  //           </Row>

  //           <Button variant='outline-warning' onClick={showRankHandler}>
  //             {" "}
  //             View previous rank
  //           </Button>

  //           {showRank && (
  //             <Row className='my-3 p-4'>
  //               <Col md={7}>
  //                 {errorRanks && <Message variant='danger'>{errorRanks}</Message>}

  //                 <Card body className='bg-primary'>
  //                   {loadingRanks ? (
  //                     <Loader />
  //                   ) : (
  //                     <Table
  //                       striped
  //                       borderless
  //                       hover
  //                       responsive
  //                       variant='light'
  //                       size='sm'
  //                       className='rounded-lg mb-0'
  //                     >
  //                       <thead>
  //                         <tr>
  //                           <th>Rank Name</th>
  //                           <th>Date Verified</th>
  //                         </tr>
  //                       </thead>
  //                       <tbody>
  //                         {ranks.map((rank) => {
  //                           return (
  //                             <tr key={rank._id}>
  //                               <td>{rank.name}</td>
  //                               <td>
  //                                 {dayjs(rank.createdAt).format("MMMM D, YYYY")}
  //                               </td>
  //                             </tr>
  //                           );
  //                         })}
  //                       </tbody>
  //                     </Table>
  //                   )}
  //                 </Card>
  //               </Col>
  //             </Row>
  //           )}

  //           <hr className='my-3' />
  //           <h4>Documents</h4>

  //           {errorDocuments && (
  //             <Message variant='danger'>{errorDocuments}</Message>
  //           )}

  //           {loadingDocuments ? (
  //             <Loader />
  //           ) : (
  //             <Row className='my-3 px-4'>
  //               <Col>
  //                 <Table
  //                   striped
  //                   borderless
  //                   hover
  //                   responsive
  //                   variant='dark'
  //                   size='sm'
  //                   className='rounded-lg'
  //                 >
  //                   <thead>
  //                     <tr>
  //                       <th>Document Name</th>
  //                       <th>Type</th>
  //                       <th>Date Uploaded</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {documents.map((doc) => {
  //                       return (
  //                         <tr key={doc._id}>
  //                           <td>{doc.name}</td>
  //                           <td>{doc.type}</td>
  //                           <td>{dayjs(doc.createdAt).format("MMMM D, YYYY")}</td>
  //                         </tr>
  //                       );
  //                     })}
  //                   </tbody>
  //                 </Table>
  //               </Col>
  //             </Row>
  //           )}
  //         </Container>
  //       )}
  //     </>
  //   );
};

export default EmployeeProfile;
