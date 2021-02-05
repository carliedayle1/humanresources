import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { Card, Form, Col, Row, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import EvaluationList from "../../components/EvaluationList";
import SearchEmployee from "../../components/SearchEmployee";
import EvaluationExcel from "../../components/EvaluationExcel";
import {
  getEvaluationRatingList,
  createEvaluation,
  listUserEvaluations,
  listAllEvaluationRatings,
} from "../../actions/evaluationActions";
import { searchUser } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Swal from "sweetalert2";

const CreateEvaluation = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userSearch = useSelector((state) => state.userSearch);
  const { user } = userSearch;

  const evaluationRatingList = useSelector(
    (state) => state.evaluationRatingList
  );
  const { ratings, loading, error } = evaluationRatingList;

  const evaluationCreate = useSelector((state) => state.evaluationCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = evaluationCreate;

  const [qce, setQce] = useState(0);
  const [rank, setRank] = useState("");

  const [show, setShow] = useState(false);

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
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (!user || !user._id) {
      } else {
        dispatch(getEvaluationRatingList(user._id));
        dispatch(listUserEvaluations(user._id));
        dispatch(listAllEvaluationRatings(user._id));
        // setName(user.name);
        // setPosition(user.position);
        // setCollege(user.college);
        // setRanking(currentRank.current || user.rank);
      }
    }
  }, [history, userInfo, user, successCreate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

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
          dispatch(
            createEvaluation(
              user._id,
              calculateTotal(),
              qce,
              rank.toString().toUpperCase()
            )
          );
          Swal.fire("Saved!", "Evaluation submitted successfully.", "success");
          setQce(0);
          setRank("");

          dispatch(searchUser(user.idNumber));
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
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Create Evaluation</h1>

          <hr className='bg-light' />
          <div className='px-5'>
            <h5>
              As of <strong>{dayjs().format("MMMM D, YYYY")}</strong>
            </h5>

            <SearchEmployee />

            <hr className='bg-light' />

            <div>
              <h4>Evaluation Ratings</h4>

              {error && (
                <div className='my-3'>
                  <Message>{error}</Message>
                </div>
              )}

              {loading ? (
                <Loader />
              ) : ratings !== undefined && ratings && ratings.length > 0 ? (
                <Table
                  striped
                  bordered
                  size='sm'
                  variant='dark'
                  className='mt-3'
                >
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
                    {ratings.map((rate) => {
                      return (
                        <tr key={rate._id}>
                          <td>{rate.educationalQualification}</td>
                          <td>{rate.academicExperience}</td>
                          <td>{rate.professionalAchievement}</td>
                          <td>{rate.evaluatedBy}</td>
                          <td>
                            {dayjs(rate.createdAt).format("MMMM D, YYYY")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div className='my-3'>
                  <Message variant='danger'>
                    There is no ratings at the moment..
                  </Message>
                </div>
              )}
            </div>
            <hr className='bg-light' />

            {errorCreate && (
              <div className='my-3'>
                <Message>{errorCreate}</Message>
              </div>
            )}

            <div className='d-flex justify-content-center'>
              <div>
                <Form className='mt-3' onSubmit={submitHandler}>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Total Points
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        value={calculateTotal()}
                        disabled
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      QCE Points
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={qce}
                        onChange={(e) => setQce(e.target.value)}
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Rank
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='text'
                        step='.01'
                        value={rank}
                        onChange={(e) => setRank(e.target.value)}
                        className='text-white'
                      />
                    </Col>
                  </Form.Group>
                  {loadingCreate ? (
                    <Loader />
                  ) : (
                    <div className='text-center'>
                      <Button className='btn btn-info shadow-lg' type='submit'>
                        Submit
                      </Button>
                    </div>
                  )}
                </Form>
              </div>
            </div>

            <hr className='bg-light' />

            <div>
              <div className='d-flex justify-content-between'>
                <Button
                  className='btn btn-lg btn-danger'
                  onClick={showListHandler}
                >
                  Show evaluation history
                </Button>
                {show && (
                  <EvaluationExcel
                    filename={`${user.lastname}, ${
                      user.firstname
                    } evaluation - ${dayjs().format("MM-DD-YYYY")}`}
                  />
                )}
              </div>

              {show && (
                <div className='my-3'>
                  <EvaluationList />
                </div>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      <br />
      <br />
      <br />
    </div>
  );
};

export default CreateEvaluation;
