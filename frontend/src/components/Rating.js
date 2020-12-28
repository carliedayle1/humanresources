import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createEvaluationRating } from "../actions/evaluationActions";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Rating = ({ userId }) => {
  const [educ, setEduc] = useState(0);
  const [acad, setAcad] = useState(0);
  const [prof, setProf] = useState(0);

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const evaluationRatingCreate = useSelector(
    (state) => state.evaluationRatingCreate
  );
  const { loading, error } = evaluationRatingCreate;

  const submitHandler = () => {
    if (userId === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't searched or inputted a user yet..",
      });
    } else {
      Swal.fire({
        title: "Submit Entry",
        html: `Educational Qualification: ${educ} <br/> Academic Experience: ${acad} <br/> Professional Achievement: ${prof}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, submit it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(createEvaluationRating(userId, educ, acad, prof));
          Swal.fire("Saved!", "Rating submitted successfully.", "success");

          setEduc(0);
          setAcad(0);
          setProf(0);
        }
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group as={Row} controlId='educqualification'>
          <Form.Label column sm={7} className='text-dark'>
            Educational Qualification
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type='number'
              step='.01'
              value={educ}
              onChange={(e) => setEduc(e.target.value)}
              ref={register({
                validate: (value) => value >= 0,
              })}
              name='educ'
            />
            {errors.educ?.type === "validate" && (
              <p className='text-danger m-0'>
                Input must not be lower than zero
              </p>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='acadexp'>
          <Form.Label column sm={7} className='text-dark'>
            Academic Experience
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type='number'
              step='.01'
              value={acad}
              onChange={(e) => setAcad(e.target.value)}
              ref={register({
                validate: (value) => value >= 0,
              })}
              name='acad'
            />
            {errors.acad?.type === "validate" && (
              <p className='text-danger m-0'>
                Input must not be lower than zero
              </p>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId='profach'>
          <Form.Label column sm={7} className='text-dark'>
            Professional Achievement
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              type='number'
              step='.01'
              value={prof}
              onChange={(e) => setProf(e.target.value)}
              ref={register({
                validate: (value) => value >= 0,
              })}
              name='prof'
            />
            {errors.prof?.type === "validate" && (
              <p className='text-danger m-0'>
                Input must not be lower than zero
              </p>
            )}
          </Col>
        </Form.Group>

        {error && <Message variant='danger'>{error}</Message>}

        {loading ? (
          <Loader />
        ) : (
          <Button type='submit' variant='secondary'>
            Submit
          </Button>
        )}
      </Form>
    </>
  );
};

export default Rating;
