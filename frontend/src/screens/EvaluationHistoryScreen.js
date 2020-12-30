import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { listEvaluations } from "../actions/evaluationActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import EvaluationHistoryExcel from "../components/EvaluationHistoryExcel";
import dayjs from "dayjs";

const EvaluationHistoryScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluationList = useSelector((state) => state.evaluationList);
  const { loading, error, evaluations } = evaluationList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(listEvaluations());
    }
  }, [history, userInfo, dispatch]);

  return (
    <>
      <h1>Evaluation History</h1>

      <Container className='bg-light rounded p-4 shadow-lg'>
        <div className='d-flex flex-row justify-content-between align-items-end'>
          <h5>List of evaluations</h5>

          {evaluations && evaluations.length > 0 && <EvaluationHistoryExcel />}
        </div>

        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : evaluations && evaluations.length <= 0 ? (
          <Message>There's no evaluations created yet..</Message>
        ) : (
          <Table striped bordered hover size='sm' responsive className='mt-3'>
            <thead>
              <tr>
                <th>Id Number</th>
                <th>Employee Name</th>
                <th>Total Points</th>
                <th>QCE Points</th>
                <th>Rank</th>
                <th>Verified By</th>
                <th>Date verified</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((eva) => {
                return (
                  <tr key={eva._id}>
                    <td>{eva.user && eva.user.idNumber}</td>
                    <td>{eva.user && eva.user.name}</td>
                    <td>{eva.total}</td>
                    <td>{eva.qce}</td>
                    <td>{eva.rank}</td>
                    <td>{eva.verifiedBy}</td>
                    <td>{dayjs(eva.createdAt).format("MMMM D, YYYY")}</td>
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

export default EvaluationHistoryScreen;
