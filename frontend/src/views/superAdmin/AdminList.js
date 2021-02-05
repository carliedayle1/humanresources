import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmins } from "../../actions/userActions";
import { Card, Table } from "react-bootstrap";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import dayjs from "dayjs";
import AdminListExcel from "../../components/AdminListExcel";

const AdminList = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userAdmins = useSelector((state) => state.userAdmins);
  const { loading, error, admins } = userAdmins;

  useEffect(() => {
    if (!userInfo || !userInfo.isSuperAdmin) {
      history.push("/");
    } else {
      dispatch(getAdmins());
    }
  }, [userInfo, history, dispatch]);
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-white'>
          <div className='d-flex justify-content-between'>
            <h1>Admins List</h1>
            {admins && admins.length > 0 && <AdminListExcel />}
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
              <Table striped bordered variant='dark' size='sm'>
                <thead>
                  <tr>
                    <th>Id Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Campus</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.length > 0 &&
                    admins.map((admin) => {
                      return (
                        <tr key={admin._id}>
                          <td>{admin.idNumber}</td>
                          <td>{admin.firstname}</td>
                          <td>{admin.lastname}</td>
                          <td>{admin.campus}</td>
                          <td>
                            {dayjs(admin.createdAt).format("MMMM D, YYYY")}
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

export default AdminList;
