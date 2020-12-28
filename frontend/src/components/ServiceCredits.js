import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createLeaveCredit } from "../actions/leaveCreditActions";

const ServiceCredits = ({ userId }) => {
  const [particular, setParticular] = useState("");
  const [serviceEarned, setServiceEarned] = useState(0);
  const [serviceAbsences, setServiceAbsences] = useState(0);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const leaveCreditCreate = useSelector((state) => state.leaveCreditCreate);
  const { loading, error } = leaveCreditCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const serviceSubmitHandler = () => {
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
            type: "Service",
            particular: particular,
            earned: serviceEarned,
            absences: serviceAbsences,
            balance: serviceEarned - serviceAbsences,
            user: userId,
            createdBy: userInfo.name,
          },
          userId
        )
      );

      setParticular("");
      setServiceAbsences(0);
      setServiceEarned(0);
    }
  };

  return (
    <>
      <Container className='bg-light rounded-lg'>
        <h4>Service Credits</h4>
        <Form onSubmit={handleSubmit(serviceSubmitHandler)} className='mt-3'>
          <Form.Group as={Row} controlId='particular'>
            <Form.Label column sm={3} className='text-dark'>
              Particular
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='text'
                step='.01'
                ref={register({
                  required: true,
                })}
                name='particular'
                value={particular}
                onChange={(e) => setParticular(e.target.value)}
              />
              {errors.particular?.type === "required" && (
                <p className='text-danger m-0'>Input required!</p>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='earnedService'>
            <Form.Label column sm={3} className='text-dark'>
              Earned
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='number'
                step='.01'
                value={serviceEarned}
                ref={register({
                  validate: (value) => value >= 0,
                })}
                name='earned'
                onChange={(e) => {
                  setServiceEarned(e.target.value);
                }}
              />
              {errors.earned?.type === "validate" && (
                <p className='text-danger m-0'>
                  Earned must not be a negative value
                </p>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='absencesService'>
            <Form.Label column sm={3} className='text-dark'>
              Absences
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='number'
                step='.01'
                value={serviceAbsences}
                onChange={(e) => {
                  setServiceAbsences(e.target.value);
                }}
                ref={register({
                  validate: (value) => value >= 0,
                })}
                name='serviceAbsence'
              />
            </Col>
            {errors.serviceAbsence?.type === "validate" && (
              <p className='text-danger m-0'>
                Absences must not be a negative value
              </p>
            )}
          </Form.Group>

          <Form.Group as={Row} controlId='balanceService'>
            <Form.Label column sm={3} className='text-dark'>
              Balance
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type='number'
                disabled
                value={serviceEarned - serviceAbsences}
              />
            </Col>
          </Form.Group>

          {error && <Message variant='danger'>{error}</Message>}

          {loading ? (
            <Loader />
          ) : (
            <Button variant='secondary' type='submit' size='sm'>
              Submit
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
};

export default ServiceCredits;
