import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Card, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserRanks,
  getEmployeeDocuments,
  getUserDetails,
} from "../actions/userActions";
import dayjs from "dayjs";

const EmployeeProfileScreen = ({ history, match }) => {
  const empId = match.params.id;

  const oldUser = useRef();

  const [showRank, setShowRank] = useState(false);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState("");
  const [campus, setCampus] = useState("");
  const [college, setCollege] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [dateHired, setDateHired] = useState("");
  const [credits, setCredits] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;

  const userRank = useSelector((state) => state.userRank);
  const { ranks, loading: loadingRanks, error: errorRanks } = userRank;

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
    if (!userInfo) {
      history.push("/");
    } else {
      // if (oldUser.current !== empId) {
      //   dispatch(getUserDetails(empId));
      //   oldUser.current = empId;
      // }

      if (
        !user ||
        user._id === undefined ||
        Object.keys(user).length === 0 ||
        oldUser.current !== empId
      ) {
        dispatch(getUserDetails(empId));
        oldUser.current = empId;
      } else {
        setName(user.name);
        setIdNumber(user.idNumber);
        setEmail(user.email);
        setPosition(user.position);
        setRank(user.rank);
        setDateHired(dayjs(user.dataHired).format("MMMM D, YYYY"));
        setCredits(user.leaveCredits);
        setCampus(user.campus);
        setCollege(user.college);
        console.log(user.leaveCredits);

        dispatch(getUserRanks(empId));
        dispatch(getEmployeeDocuments(empId));
      }
    }
    // eslint-disable-next-line
  }, [userInfo, history, dispatch, user]);

  const showRankHandler = () => {
    setShowRank(!showRank);
  };

  return (
    <>
      <h1>Employee Profile</h1>
      <Link to='/employees'>
        {" "}
        <Button variant='outline-info' className='my-3'>
          Go back
        </Button>
      </Link>
      {error && <Message variant='danger'>{error}</Message>}

      {loading ? (
        <Loader />
      ) : (
        <Container className='bg-light rounded shadow-lg p-4'>
          <h3>Personal Information</h3>

          <Row className='my-3 px-4'>
            <Col sm={12} md={6}>
              <Card body className='bg-info shadow text-light '>
                <Row>
                  <Col md={4}>
                    <h5>ID Number:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{idNumber}</strong>
                    </h5>
                  </Col>
                  <Col md={4}>
                    <h5>Name:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{name}</strong>
                    </h5>
                  </Col>
                  <Col md={4}>
                    <h5>Email:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{email}</strong>
                    </h5>
                  </Col>
                  <Col md={4}>
                    <h5>Position:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{position}</strong>
                    </h5>
                  </Col>
                  <Col md={4}>
                    <h5>Rank:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{rank}</strong>
                    </h5>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col sm={12} md={6}>
              <Card body className='bg-secondary shadow text-light '>
                <Row>
                  <Col md={4}>
                    <h5>Date Hired:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{dayjs(dateHired).format("MMMM D, YYYY")}</strong>
                    </h5>
                  </Col>
                  <Col md={4}>
                    <h5>Total Leave Credits:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{credits}</strong>
                    </h5>
                  </Col>
                  <Col md={4}>
                    <h5>Campus:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{campus}</strong>
                    </h5>
                  </Col>
                  <Col md={4}>
                    <h5>College:</h5>
                  </Col>
                  <Col md={8}>
                    <h5>
                      <strong>{college}</strong>
                    </h5>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Button variant='outline-warning' onClick={showRankHandler}>
            {" "}
            View previous rank
          </Button>

          {showRank && (
            <Row className='my-3 p-4'>
              <Col md={7}>
                {errorRanks && <Message variant='danger'>{errorRanks}</Message>}

                <Card body className='bg-primary'>
                  {loadingRanks ? (
                    <Loader />
                  ) : (
                    <Table
                      striped
                      borderless
                      hover
                      responsive
                      variant='light'
                      size='sm'
                      className='rounded-lg mb-0'
                    >
                      <thead>
                        <tr>
                          <th>Rank Name</th>
                          <th>Date Verified</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ranks.map((rank) => {
                          return (
                            <tr key={rank._id}>
                              <td>{rank.name}</td>
                              <td>
                                {dayjs(rank.createdAt).format("MMMM D, YYYY")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  )}
                </Card>
              </Col>
            </Row>
          )}

          <hr className='my-3' />
          <h4>Documents</h4>

          {errorDocuments && (
            <Message variant='danger'>{errorDocuments}</Message>
          )}

          {loadingDocuments ? (
            <Loader />
          ) : (
            <Row className='my-3 px-4'>
              <Col>
                <Table
                  striped
                  borderless
                  hover
                  responsive
                  variant='dark'
                  size='sm'
                  className='rounded-lg'
                >
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Type</th>
                      <th>Date Uploaded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => {
                      return (
                        <tr key={doc._id}>
                          <td>{doc.name}</td>
                          <td>{doc.type}</td>
                          <td>{dayjs(doc.createdAt).format("MMMM D, YYYY")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default EmployeeProfileScreen;
