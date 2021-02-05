import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEvaluators } from "../../actions/evaluationActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import EvaluatorsExcel from "../../components/EvaluatorsExcel";
import dayjs from "dayjs";

const EvaluatorList = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluatorList = useSelector((state) => state.evaluatorList);
  const { loading, error, evaluators } = evaluatorList;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      dispatch(listEvaluators());
    }
  }, [userInfo, history, dispatch]);
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <div className='d-flex justify-content-between'>
            <h1>Evaluator List</h1>
            {evaluators && evaluators.length > 0 && <EvaluatorsExcel />}
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
            ) : evaluators ? (
              <Table striped bordered size='sm' variant='dark' className='mt-3'>
                <thead>
                  <tr>
                    <th>ID Number</th>

                    <th>Evaluator Name</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluators.map((eva) => {
                    return (
                      <tr key={eva._id}>
                        <td>{eva.idNumber}</td>
                        <td>{`${eva.lastname}, ${eva.firstname}`}</td>

                        <td>{dayjs(eva.createdAt).format("MMMM D, YYYY")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <div className='my-3'>
                <Message variant='danger'>There is no evaluators yet..</Message>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EvaluatorList;
