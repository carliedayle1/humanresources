import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listEvaluationRatings } from "../../actions/evaluationActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import RatingsHistoryExcel from "../../components/RatingsHistoryExcel";
import dayjs from "dayjs";
import { Card, Table } from "react-bootstrap";

const EvaluationRatingsHistory = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluationRatingsList = useSelector(
    (state) => state.evaluationRatingsList
  );
  const { loading, error, ratings } = evaluationRatingsList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(listEvaluationRatings());
    }
  }, [history, userInfo, dispatch]);
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <div className='d-flex justify-content-between'>
            <h1>Evaluation Ratings History</h1>
            {ratings && ratings.length > 0 && <RatingsHistoryExcel />}
          </div>
          <hr className='bg-light' />

          <div className='px-5'>
            {error && (
              <div className='my-3'>
                <Message>{error}</Message>
              </div>
            )}
            {loading ? (
              <Loader />
            ) : (
              <Table striped bordered variant='dark' size='sm' responsive>
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
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EvaluationRatingsHistory;
