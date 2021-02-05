import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import SearchEmployee from "../../components/SearchEmployee";
import { createEvaluationRating } from "../../actions/evaluationActions";

const Rating = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userSearch = useSelector((state) => state.userSearch);
  const { user } = userSearch;

  // const evaluationRatingCreate = useSelector(
  //   (state) => state.evaluationRatingCreate
  // );
  // const { success } = evaluationRatingCreate;

  const [educ, setEduc] = useState(0);
  const [acad, setAcad] = useState(0);
  const [prof, setProf] = useState(0);

  useEffect(() => {
    if (!userInfo || !userInfo.isEvaluator) {
      history.push("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user || Object.keys(user).length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't searched or inputted a user yet..",
      });
      return;
    }

    dispatch(createEvaluationRating(user._id, educ, acad, prof));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Evaluation rating saved!",
      showConfirmButton: false,
      timer: 5000,
    });

    setProf(0);
    setAcad(0);
    setEduc(0);
  };
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Evaluation Rating</h1>

          <hr className='bg-light' />
          <div className='px-5'>
            <h5>
              As of <strong>{dayjs().format("MMMM YYYY")}</strong>
            </h5>

            <SearchEmployee />

            <hr className='bg-light' />

            <div className='d-flex justify-content-center'>
              <div>
                <Form className='mt-3' onSubmit={submitHandler}>
                  <Form.Group as={Row}>
                    <Form.Label column sm='6'>
                      Educational Qualification
                    </Form.Label>
                    <Col sm='6'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={educ}
                        onChange={(e) => setEduc(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='6'>
                      Academic Experience
                    </Form.Label>
                    <Col sm='6'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={acad}
                        onChange={(e) => setAcad(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='6'>
                      Professional Achievement
                    </Form.Label>
                    <Col sm='6'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={prof}
                        onChange={(e) => setProf(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <div className='text-center'>
                    <Button className='btn btn-info shadow-lg' type='submit'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Rating;
