import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table } from "react-bootstrap";
import { listLeaveCredits } from "../actions/leaveCreditActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import LeaveCreditHistoryExcel from "../components/LeaveCreditHistoryExcel";
import dayjs from "dayjs";

const LeaveCreditHistoryScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveCreditList = useSelector((state) => state.leaveCreditList);
  const { loading, error, leaveCredits } = leaveCreditList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(listLeaveCredits());
    }
  }, [history, userInfo, dispatch]);

  return (
    <>
      <h1>Leave Credit History</h1>
      <Container className='bg-light p-4 rounded shadow-lg'>
        <div className='d-flex flex-row justify-content-between align-items-end'>
          <h5>List of Leave credits</h5>
          <div>
            {leaveCredits && leaveCredits.length > 0 && (
              <LeaveCreditHistoryExcel />
            )}
          </div>
        </div>
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : leaveCredits.length === 0 || leaveCredits === undefined ? (
          <Message variant='info'>There is no credit history yet</Message>
        ) : (
          <Table striped bordered hover size='sm' responsive className='mt-3'>
            <thead>
              <tr>
                <th>Id Number</th>
                <th>Employee Name</th>
                <th>Type</th>
                <th>Particular</th>
                <th>Earned</th>
                <th>Absences</th>
                <th>Balance</th>
                <th>Date Credited</th>
              </tr>
            </thead>
            <tbody>
              {leaveCredits.map((credit) => {
                return (
                  <tr key={credit._id}>
                    <td>{credit.user && credit.user.idNumber}</td>
                    <td>{credit.user && credit.user.name}</td>
                    <td>{credit.type}</td>
                    <td>{credit.particular ? credit.particular : ""}</td>
                    <td>{credit.earned}</td>
                    <td>{credit.absences}</td>
                    <td>{credit.balance}</td>
                    <td>{dayjs(credit.createdAt).format("MMMM D, YYYY")}</td>
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

export default LeaveCreditHistoryScreen;
