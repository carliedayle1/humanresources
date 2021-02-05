import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersReport,
  getAllCreditsReport,
} from "../../actions/userActions";
import UsersAllReportExcel from "../../components/UsersAllReportExcel";
import AllCreditsReportExcel from "../../components/AllCreditsReportExcel";

const Reports = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const usersAllReport = useSelector((state) => state.usersAllReport);
  const { users } = usersAllReport;

  const usersAllCreditsReport = useSelector(
    (state) => state.usersAllCreditsReport
  );
  const { leaveCredits } = usersAllCreditsReport;

  useEffect(() => {
    if (!userInfo || !userInfo.isSuperAdmin) {
      history.push("/");
    } else {
      dispatch(getAllUsersReport());
      dispatch(getAllCreditsReport());
    }
  }, [userInfo, history, dispatch]);

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-white'>
          <h1>Reports</h1>
          <hr className='bg-white' />

          <div className='px-5'>
            <div className='my-3'>{users && <UsersAllReportExcel />}</div>
            <div className='my-3'>
              {leaveCredits && <AllCreditsReportExcel />}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reports;
