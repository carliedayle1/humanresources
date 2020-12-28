import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SearchEmployee from "../components/SearchEmployee";
import Rating from "../components/Rating";
import EvaluationList from "../components/EvaluationList";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import {
  getEvaluationRatingList,
  createEvaluation,
  listUserEvaluations,
} from "../actions/evaluationActions";
import Swal from "sweetalert2";

const EvaluationScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [college, setCollege] = useState("");
  const [ranking, setRanking] = useState("");
  const currentRank = useRef("");

  const [qce, setQce] = useState(0);
  const [rank, setRank] = useState("");

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const userSearch = useSelector((state) => state.userSearch);
  const { user } = userSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluationRatingList = useSelector(
    (state) => state.evaluationRatingList
  );
  const {
    loading: loadingList,
    error: errorList,
    ratings,
  } = evaluationRatingList;

  const evaluationRatingCreate = useSelector(
    (state) => state.evaluationRatingCreate
  );
  const { success } = evaluationRatingCreate;

  const evaluationCreate = useSelector((state) => state.evaluationCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = evaluationCreate;

  const calculateTotal = () => {
    return ratings !== undefined
      ? ratings.reduce(
          (acc, item) =>
            acc +
            item.educationalQualification +
            item.academicExperience +
            item.professionalAchievement,
          0
        )
      : 0;
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user || !user._id) {
      } else {
        dispatch(getEvaluationRatingList(user._id));
        dispatch(listUserEvaluations(user._id));
        setName(user.name);
        setPosition(user.position);
        setCollege(user.college);
        setRanking(currentRank.current || user.rank);
      }
    }
  }, [history, userInfo, success, user, dispatch, successCreate]);

  const submitHandler = () => {
    if (user._id === undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't searched or inputted a user yet..",
      });
    } else {
      Swal.fire({
        title: "Submit Entry",
        html: `Total Points: ${calculateTotal()} <br/> QCE Points: ${qce} <br/> Rank: ${rank}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, submit it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setRanking(rank);
          dispatch(createEvaluation(user._id, calculateTotal(), qce, rank));
          Swal.fire("Saved!", "Evaluation submitted successfully.", "success");
          currentRank.current = rank;
          setQce(0);
          setRank("");
        }
      });
    }
  };

  const showListHandler = () => {
    if (!user || !user._id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must input or search an employee first",
      });
    } else {
      setShow(!show);
    }
  };

  return (
    <>
      <h1>Evaluation</h1>

      <Container className='bg-light rounded-lg py-3'>
        <h5>
          <strong>{dayjs().format("MMMM D, YYYY")}</strong>
        </h5>

        <SearchEmployee />

        {user && Object.keys(user).length > 0 && (
          <Container as={Row} className='mt-2 mb-5'>
            <Col sm={12} md={6}>
              <Row>
                <Col sm={3}>
                  <h5> Name :</h5>
                </Col>
                <Col sm={9}>
                  <h5>
                    <strong>{name}</strong>
                  </h5>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6}>
              <Row>
                <Col sm={3}>
                  <h5> College :</h5>
                </Col>
                <Col sm={9}>
                  <h5>
                    <strong>{college}</strong>
                  </h5>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6}>
              <Row>
                <Col sm={3}>
                  <h5> Position :</h5>
                </Col>
                <Col sm={9}>
                  <h5>
                    <strong>{position}</strong>
                  </h5>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={6}>
              <Row>
                <Col sm={3}>
                  <h5> Rank :</h5>
                </Col>
                <Col sm={9}>
                  <h5>
                    <strong>{ranking}</strong>
                  </h5>
                </Col>
              </Row>
            </Col>
          </Container>
        )}

        <hr className='my-4' />

        <Container>
          <h4>Evaluation Ratings</h4>
          <Container
            as={Row}
            className={
              userInfo && userInfo.isEvaluator === true
                ? "d-flex justify-content-center py-3"
                : "py-3"
            }
          >
            <Col sm={12} md={5}>
              <Rating userId={user._id !== undefined ? user._id : ""} />
            </Col>

            {userInfo && userInfo.isEvaluator === false && (
              <Col sm={12} md={7}>
                {loadingList ? (
                  <Loader />
                ) : (
                  <Table striped bordered hover size='sm' responsive>
                    <thead>
                      <tr>
                        <th>Educational Qualification</th>
                        <th>Academic Experience</th>
                        <th>Professional Achievement</th>
                        <th>Rated By</th>
                        <th>Date Rated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ratings !== undefined &&
                        ratings.map((rating) => {
                          return (
                            <tr key={rating._id}>
                              <td>{rating.educationalQualification}</td>
                              <td>{rating.academicExperience}</td>
                              <td>{rating.professionalAchievement}</td>
                              <td>{rating.evaluatedBy}</td>
                              <td>
                                {dayjs(rating.createdAt).format("MM/DD/YYYY")}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                )}
                {errorList && <Message variant='danger'>{errorList}</Message>}
              </Col>
            )}
          </Container>

          <hr className='my-3' />

          {userInfo && userInfo.isEvaluator === false && (
            <Container className='d-flex justify-content-center py-3'>
              <Form className='w-50' onSubmit={handleSubmit(submitHandler)}>
                <Form.Group as={Row} controlId='total'>
                  <Form.Label column sm={3} className='text-dark'>
                    Total Points
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type='number'
                      step='.01'
                      value={calculateTotal()}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='qce'>
                  <Form.Label column sm={3} className='text-dark'>
                    QCE Points
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type='number'
                      step='.01'
                      value={qce}
                      onChange={(e) => setQce(e.target.value)}
                      ref={register({
                        validate: (value) => value >= 0,
                      })}
                      name='qce'
                    />
                    {errors.qce?.type === "validate" && (
                      <p className='text-danger'>
                        Input must not be lower than zero
                      </p>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='rank'>
                  <Form.Label column sm={3} className='text-dark'>
                    Rank
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control
                      type='text'
                      value={rank}
                      onChange={(e) => setRank(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                {errorCreate && (
                  <Message variant='danger'>{errorCreate}</Message>
                )}

                <div className='d-flex justify-content-center'>
                  {loadingCreate ? (
                    <Loader />
                  ) : (
                    <Button
                      type='submit'
                      variant='info'
                      size='lg'
                      className='shadow-lg'
                      disabled={
                        rank === ""
                          ? true
                          : calculateTotal() <= 0
                          ? true
                          : false
                      }
                    >
                      Verify
                    </Button>
                  )}
                </div>
              </Form>
            </Container>
          )}
        </Container>

        {userInfo && userInfo.isAdmin && (
          <>
            <Button
              variant='dark'
              size='lg'
              // disabled={!user || !user._id ? true : false}
              onClick={showListHandler}
            >
              {show ? "Hide" : "Show"} evaluation list
            </Button>

            {show && <EvaluationList />}
          </>
        )}
      </Container>
    </>
  );
};

export default EvaluationScreen;
