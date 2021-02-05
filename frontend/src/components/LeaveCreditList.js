import React from "react";
import { useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import dayjs from "dayjs";

const LeaveCreditList = () => {
  const leaveCreditUserList = useSelector((state) => state.leaveCreditUserList);
  const { loading, error, leaveCredits } = leaveCreditUserList;

  return (
    <>
      <Container className='my-3'>
        {loading ? (
          <Loader />
        ) : leaveCredits.length === 0 ? (
          <Message variant='info'>
            Employee have no leave credit history..
          </Message>
        ) : (
          <div>
            <Table striped bordered responsive variant='dark' size='sm'>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Particular</th>
                  <th>Earned</th>
                  <th>Absences</th>
                  <th>Balance</th>
                  <th>Created by</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {leaveCredits.map((leave) => {
                  return (
                    <tr key={leave._id}>
                      <td>{leave.type}</td>
                      <td>{leave.particular ? leave.particular : ""}</td>
                      <td>{leave.earned}</td>
                      <td>{leave.absences}</td>
                      <td>{leave.balance}</td>
                      <td>{leave.createdBy}</td>
                      <td>{dayjs(leave.createdAt).format("MMMM D, YYYY")}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <strong>
                      Total Earned:{" "}
                      {leaveCredits
                        .reduce((acc, item) => acc + item.earned, 0)
                        .toFixed(2)}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      Total Absences:{" "}
                      {leaveCredits
                        .reduce((acc, item) => acc + item.absences, 0)
                        .toFixed(2)}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      Total Balance:{" "}
                      {leaveCredits
                        .reduce((acc, item) => acc + item.balance, 0)
                        .toFixed(2)}
                    </strong>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}

        {error && <Message variant='danger'>{error}</Message>}
      </Container>
    </>
  );
};

export default LeaveCreditList;
