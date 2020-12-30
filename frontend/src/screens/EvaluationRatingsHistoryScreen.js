import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { listEvaluationRatings } from "../actions/evaluationActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import RatingsHistoryExcel from "../components/RatingsHistoryExcel";
import dayjs from "dayjs";

const EvaluationRatingsHistoryScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluationRatingsList = useSelector(
    (state) => state.evaluationRatingsList
  );
  const { loading, error, ratings } = evaluationRatingsList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(listEvaluationRatings());
    }
  }, [history, userInfo, dispatch]);

  return (
    <>
      <h1>Evaluation Rating History</h1>

      <Container className='bg-light rounded p-4 shadow-lg'>
        <div className='d-flex justify-content-between align-items-end'>
          <h5>List of ratings</h5>
          {ratings && ratings.length > 0 && <RatingsHistoryExcel />}
        </div>

        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Table striped bordered hover size='sm' responsive className='mt-3'>
            <thead>
              <tr>
                <th>Id Number</th>
                <th>Employee Name</th>
                <th>Educational Qualification</th>
                <th>Academic Experience</th>
                <th>Professional Achievement</th>
                <th>Verified</th>
                <th>Evaluated By</th>
                <th>Date Evaluated</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => {
                return (
                  <tr key={rating._id}>
                    <td>{rating.user && rating.user.idNumber}</td>
                    <td>{rating.user && rating.user.name}</td>
                    <td>{rating.educationalQualification}</td>
                    <td>{rating.academicExperience}</td>
                    <td>{rating.professionalAchievement}</td>
                    <td>{rating.verified ? "Yes" : "No"}</td>
                    <td>{rating.evaluatedBy}</td>
                    <td>{dayjs(rating.createdAt).format("MM-DD-YYYY")}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default EvaluationRatingsHistoryScreen;
