import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { USER_REGISTER_RESET } from "../constants/userConstants";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { registerUser } from "../actions/userActions";

const CreateEvaluatorScreen = ({ history }) => {
  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345");

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { success, loading, error } = userRegister;

  useEffect(() => {
    if (!userInfo && userInfo.isAdmin === false) {
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
        history.push("/evaluator/list");
      }
    }
  }, [history, userInfo, success, dispatch]);

  const submitHandler = () => {
    dispatch(
      registerUser({
        idNumber,
        name,
        email,
        password,
        isEvaluator: true,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <h2>Create new evaluator</h2>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId='idNumber'>
            <Form.Label> Id Number </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter id number'
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              ref={register({
                required: true,
              })}
              name='idnumber'
            ></Form.Control>
            {errors.idnumber?.type === "required" && (
              <p className='text-danger'>Input is required</p>
            )}
          </Form.Group>

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
              name='namee'
            ></Form.Control>
            {errors.namee?.type === "required" && (
              <p className='text-danger'>Name is required</p>
            )}
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label> Email </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={register({
                required: true,
              })}
              name='emails'
            ></Form.Control>
            {errors.emails?.type === "required" && (
              <p className='text-danger'>Email is required</p>
            )}
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>
              {" "}
              Password (Note: The default password for all users is 12345){" "}
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={register({
                required: true,
              })}
              name='pass'
            ></Form.Control>
            {errors.pass?.type === "required" && (
              <p className='text-danger'>Email is required</p>
            )}
          </Form.Group>

          <Button type='submit' variant='secondary'>
            Register
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateEvaluatorScreen;
