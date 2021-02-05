import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { registerUser } from "../../actions/userActions";
import { USER_REGISTER_RESET } from "../../constants/userConstants";

import Swal from "sweetalert2";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const CreateEvaluator = ({ history }) => {
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

  useEffect(() => {
    // console.log(!userInfo || !userInfo.isAdmin);
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (success) {
        dispatch({ type: USER_REGISTER_RESET });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Evaluator creation success",
          showConfirmButton: false,
          timer: 1500,
        });
        history.push("/evaluators");
      }
    }
  }, [history, userInfo, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      registerUser({
        idNumber,
        firstname: firstname.toString().toUpperCase(),
        middlename: middlename.toString().toUpperCase(),
        lastname: lastname.toString().toUpperCase(),
        email,
        password: lastname.toString().toUpperCase(),
        isEvaluator: true,
      })
    );

    setEmail("");
    setFirstname("");
    setLastname("");
    setMiddlename("");
    setIdNumber("");
  };

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Create Evaluator</h1>
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
                  Password:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    type='password'
                    disabled
                    className='text-dark'
                  />
                  <p>
                    Default password is the{" "}
                    <strong>LAST NAME of the EMPLOYEE</strong>
                  </p>
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

export default CreateEvaluator;
