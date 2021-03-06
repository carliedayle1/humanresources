import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

import { registerUser } from "../../actions/userActions";
import { USER_REGISTER_RESET } from "../../constants/userConstants";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Swal from "sweetalert2";

const EmployeeCreate = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  const [idNumber, setIdNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [rank, setRank] = useState("");
  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");
  const [dateHired, setDateHired] = useState("");

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (success) {
        dispatch({ type: USER_REGISTER_RESET });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Employee creation success",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/employees");
      }
    }
  }, [userInfo, history, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        idNumber,
        firstname: firstname.toString().toUpperCase(),
        middlename: middlename.toString().toUpperCase(),
        lastname: lastname.toString().toUpperCase(),
        email,
        college: college.toString().toUpperCase(),
        position: Number(position),
        rank: rank.toString().toUpperCase(),
        dateHired,
        password: lastname.toString().toUpperCase(),
        campus: userInfo.campus,
        program: program.toString().toUpperCase(),
      })
    );
  };

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body>
          <h1 className='text-light'>Employee Creation</h1>
          <hr className='bg-light' />

          <div className='px-5'>
            {error && (
              <div className='my-3'>
                <Message>{error}</Message>
              </div>
            )}
            <Form className='text-light' onSubmit={submitHandler}>
              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  ID Number:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                    className='text-white'
                  />
                </Col>
                <Form.Label column sm='2'>
                  Date Hired:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    type='date'
                    value={dateHired}
                    onChange={(e) => setDateHired(e.target.value)}
                    required
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
                    value={firstname}
                    required
                    onChange={(e) => setFirstname(e.target.value)}
                    className='text-white'
                  />
                </Col>
                <Form.Label column sm='2'>
                  Email:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={middlename}
                    required
                    onChange={(e) => setMiddlename(e.target.value)}
                    className='text-white'
                  />
                </Col>
                <Form.Label column sm='2'>
                  Position Type:
                </Form.Label>
                <Col sm={4}>
                  <select
                    className='form-control'
                    id='position'
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </select>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Last name:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    value={lastname}
                    required
                    onChange={(e) => setLastname(e.target.value)}
                    className='text-white'
                  />
                </Col>
                <Form.Label column sm='2'>
                  Rank:
                </Form.Label>
                <Col sm={4}>
                  <select
                    className='form-control text-white'
                    id='rank'
                    onChange={(e) => setRank(e.target.value)}
                  >
                    <option value='INSTRUCTOR 1'>INSTRUCTOR 1</option>
                    <option value='INSTRUCTOR 2'>INSTRUCTOR 2</option>
                    <option value='INSTRUCTOR 3'>INSTRUCTOR 3</option>
                    <hr className='bg-white' />
                    <option value='ASSISTANT PROFESSOR 1'>
                      ASSISTANT PROFESSOR 1
                    </option>
                    <option value='ASSISTANT PROFESSOR 2'>
                      ASSISTANT PROFESSOR 2
                    </option>
                    <option value='ASSISTANT PROFESSOR 3'>
                      ASSISTANT PROFESSOR 3
                    </option>
                    <option value='ASSISTANT PROFESSOR 4'>
                      ASSISTANT PROFESSOR 4
                    </option>
                    <hr className='bg-white' />

                    <option value='ASSOCIATE PROFESSOR 1'>
                      ASSOCIATE PROFESSOR 1
                    </option>
                    <option value='ASSOCIATE PROFESSOR 2'>
                      ASSOCIATE PROFESSOR 2
                    </option>
                    <option value='ASSOCIATE PROFESSOR 3'>
                      ASSOCIATE PROFESSOR 3
                    </option>
                    <option value='ASSOCIATE PROFESSOR 4'>
                      ASSOCIATE PROFESSOR 4
                    </option>
                    <option value='ASSOCIATE PROFESSOR 5'>
                      ASSOCIATE PROFESSOR 5
                    </option>
                    <hr className='bg-white' />

                    <option value='PROFESSOR 1'>PROFESSOR 1</option>
                    <option value='PROFESSOR 2'>PROFESSOR 2</option>
                    <option value='PROFESSOR 3'>PROFESSOR 3</option>
                    <option value='PROFESSOR 4'>PROFESSOR 4</option>
                    <option value='PROFESSOR 5'>PROFESSOR 5</option>
                    <option value='PROFESSOR 6'>PROFESSOR 6</option>
                    <hr className='bg-white' />

                    <option value='UNIVERSITY PROFESSOR'>
                      UNIVERSITY PROFESSOR
                    </option>
                  </select>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Campus:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue={
                      userInfo && userInfo.campus ? userInfo.campus : ""
                    }
                    disabled
                    className='text-white'
                  />
                </Col>
                <Form.Label column sm='2'>
                  College:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
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
                    disabled
                    className='text-white'
                  />
                  <p>
                    Default password of the employee will be their
                    <strong> LAST NAME IN UPPERCASE</strong>
                  </p>
                </Col>
                <Form.Label column sm='2'>
                  Program:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className='text-white'
                  />
                </Col>
              </Form.Group>

              {loading ? (
                <Loader />
              ) : (
                <div className='text-center'>
                  <Button
                    type='submit'
                    className='btn btn-lg btn-info shadow-lg'
                  >
                    Create
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </Card.Body>
      </Card>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default EmployeeCreate;
