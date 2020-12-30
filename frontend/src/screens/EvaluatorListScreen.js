import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEvaluators } from "../actions/evaluationActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import EvaluatorsExcel from "../components/EvaluatorsExcel";

const EvaluatorListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluatorList = useSelector((state) => state.evaluatorList);
  const { loading, error, evaluators } = evaluatorList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listEvaluators());

      if (!userInfo.isAdmin) {
        history.push("/");
      }
    } else {
      history.push("/");
    }
  }, [userInfo, history, dispatch]);

  return (
    <Container>
      <h3>All Evaluators</h3>

      {evaluators && evaluators.length > 0 && <EvaluatorsExcel />}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : evaluators && evaluators.length <= 0 ? (
        <Message>There's no evaluators yet...</Message>
      ) : (
        <Table striped bordered hover responsive className='mt-3'>
          <thead>
            <tr>
              <th>Id Number</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {evaluators.map((eva) => (
              <tr key={eva._id}>
                <td>{eva.idNumber}</td>
                <td>{eva.name}</td>
                <td>{eva.email}</td>

                <td>
                  {" "}
                  {/* <LinkContainer to={`/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer> */}
                  {/* <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default EvaluatorListScreen;
