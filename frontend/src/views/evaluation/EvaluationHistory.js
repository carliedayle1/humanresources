import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Table } from "react-bootstrap";
import { listEvaluations } from "../../actions/evaluationActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import EvaluationHistoryExcel from "../../components/EvaluationHistoryExcel";
import dayjs from "dayjs";

const EvaluationHistory = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluationList = useSelector((state) => state.evaluationList);
  const { loading, error, evaluations } = evaluationList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(listEvaluations());
    }
  }, [history, userInfo, dispatch]);

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <div className='d-flex justify-content-between'>
            <h1>Evaluation History</h1>
            {evaluations && evaluations.length > 0 && (
              <EvaluationHistoryExcel />
            )}
          </div>
          <hr className='bg-light' />

          <div className='px-5'>
            {error && <Message>{error}</Message>}
            {loading ? (
              <Loader />
            ) : evaluations && evaluations.length <= 0 ? (
              <Message>There's no evaluations created yet..</Message>
            ) : (
              <Table striped bordered size='sm' responsive variant='dark'>
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
                        <td>
                          {eva.user && eva.user.lastname
                            ? `${eva.user.lastname}, ${eva.user.firstname}`
                            : ""}
                        </td>
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
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EvaluationHistory;
