import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import dayjs from "dayjs";

const EvaluationList = () => {
  const evaluationUserList = useSelector((state) => state.evaluationUserList);
  const { evaluations, loading, error } = evaluationUserList;

  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}

      {loading ? (
        <Loader />
      ) : !evaluations || evaluations.length === 0 ? (
        <Message>Employee has no evaluations yet..</Message>
      ) : (
        <Table striped bordered responsive size='sm' variant='dark'>
          <thead>
            <tr>
              <th>Total Points</th>
              <th>QCE Points</th>
              <th>Rank</th>
              <th>Verified By</th>
              <th>Date Verified</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((eva) => {
              return (
                <tr key={eva._id}>
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
    </>
  );
};

export default EvaluationList;
