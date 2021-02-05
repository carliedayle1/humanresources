import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { USER_REGISTER_RESET } from "../../constants/userConstants";
import { registerUser } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const CreateAdmin = ({ history }) => {
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
  const [campus, setCampus] = useState("BALILIHAN 1");

  useEffect(() => {
    if (!userInfo || !userInfo.isSuperAdmin) {
      history.push("/");
    } else {
      if (success) {
        dispatch({ type: USER_REGISTER_RESET });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Admin creation success",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/admin");
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
        campus: campus.split(" ")[0],
        program: program.toString().toUpperCase(),
        userType: Number(campus.split(" ")[1]),
        isAdmin: true,
      })
    );
  };

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Admin Creation</h1>
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
                <Col sm='4'>
                  <Form.Control
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className='text-white'
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Campus:
                </Form.Label>
                <Col sm={4}>
                  <select
                    className='form-control'
                    id='campus'
                    onChange={(e) => setCampus(e.target.value)}
                  >
                    <option value='BALILIHAN 1'>BALILIHAN</option>
                    <option value='BILAR 2'>BILAR</option>
                    <option value='CALAPE 3'>CALAPE</option>
                    <option value='CANDIJAY 4'>CANDIJAY</option>
                    <option value='CLARIN 5'>CLARIN</option>
                    <option value='TAGBILARAN CITY 6'>TAGBILARAN CITY</option>
                  </select>
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
    </div>
  );
};

export default CreateAdmin;
