import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listLeaveCredits } from "../../actions/leaveCreditActions";

import LeaveCreditHistoryExcel from "../../components/LeaveCreditHistoryExcel";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import dayjs from "dayjs";

const LeaveCreditHistory = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveCreditList = useSelector((state) => state.leaveCreditList);
  const { loading, error, leaveCredits } = leaveCreditList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listLeaveCredits());
    }
  }, [history, userInfo, dispatch]);

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <div className='d-flex justify-content-between'>
            <h1>Leave Credit History</h1>
            {leaveCredits && leaveCredits.length > 0 && (
              <LeaveCreditHistoryExcel />
            )}
          </div>
          <hr className='bg-light' />

          {error && (
            <div className='my-3'>
              <Message>{error}</Message>
            </div>
          )}

          <div className='px-5'>
            {loading ? (
              <Loader />
            ) : leaveCredits.length === 0 || leaveCredits === undefined ? (
              <div className='mt-3'>
                <Message variant='danger'>
                  No leave credit history yet..
                </Message>
              </div>
            ) : (
              <Table striped bordered size='sm' variant='dark' className='mt-3'>
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
                        <td>
                          {credit.user && credit.user.idNumber
                            ? credit.user.idNumber
                            : ""}
                        </td>
                        <td>
                          {credit.user && credit.user.firstname
                            ? `${credit.user.lastname}, ${credit.user.firstname}`
                            : ""}
                        </td>
                        <td>{credit.type}</td>
                        <td>{credit.particular ? credit.particular : ""}</td>
                        <td>{credit.earned}</td>
                        <td>{credit.absences}</td>
                        <td>{credit.balance}</td>
                        <td>
                          {dayjs(credit.createdAt).format("MMMM D, YYYY")}
                        </td>
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

export default LeaveCreditHistory;
