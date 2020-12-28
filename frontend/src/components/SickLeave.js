import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createLeaveCredit } from "../actions/leaveCreditActions";

const SickLeave = ({ userId }) => {
  const [earned, setEarned] = useState(0);
  const [absences, setAbsences] = useState(0);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const leaveCreditCreate = useSelector((state) => state.leaveCreditCreate);
  const { loading, error } = leaveCreditCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = () => {
    if (userId === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't searched or inputted a user yet..",
      });
    } else {
      dispatch(
        createLeaveCredit(
          {
            type: "Sick",
            earned,
            absences,
            balance: earned - absences,
            user: userId,
            createdBy: userInfo.name,
          },
          userId
        )
      );

      setEarned(0);
      setAbsences(0);
    }
  };

  return (
    <>
      <Container className='bg-light rounded-lg'>
        <h4>Sick Leave</h4>
        <Form onSubmit={handleSubmit(submitHandler)} className='mt-3'>
          <Form.Group as={Row} controlId='earnedService'>
            <Form.Label column sm={3} className='text-dark'>
              Earned
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='number'
                step='.01'
                value={earned}
                ref={register({
                  validate: (value) => value >= 0,
                })}
                onChange={(e) => setEarned(e.target.value)}
                name='earned'
              />
              {errors.earned?.type === "validate" && (
                <p className='text-danger m-0'>
                  Earned must not be a negative value
                </p>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='sickAbsence'>
            <Form.Label column sm={3} className='text-dark'>
              Absences
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='number'
                value={absences}
                step='.01'
                ref={register({
                  validate: (value) => value >= 0,
                })}
                onChange={(e) => setAbsences(e.target.value)}
                name='sickAbsence'
              />
              {errors.sickAbsence?.type === "validate" && (
                <p className='text-danger m-0'>
                  Absences must not be a negative value
                </p>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='balanceService'>
            <Form.Label column sm={3} className='text-dark'>
              Balance
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='number'
                value={earned - absences}
                step='.01'
                disabled
              />
            </Col>
          </Form.Group>

          {error && <Message variant='danger'>{error}</Message>}

          {loading ? (
            <Loader />
          ) : (
            <Button variant='info' type='submit' size='sm'>
              Submit
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
};

export default SickLeave;
