import React, { useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../../actions/userActions";
// import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import EmployeesExcel from "../../components/EmployeesExcel";

const EmployeeList = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listUsers());
    }
  }, [userInfo, history, dispatch, successDelete]);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <div className='d-flex justify-content-between'>
            <h1>Employee List</h1>
            {users && users.length > 0 && (
              <EmployeesExcel
                filename={`Employees List ${dayjs().format("MMMM D, YYYY")}`}
              />
            )}
          </div>
          <hr className='bg-light' />

          <div className='px-5'>
            {loadingDelete && (
              <div className='my-3'>
                <Loader />
              </div>
            )}
            {errorDelete && (
              <div className='mt-3'>
                <Message>{errorDelete}</Message>
              </div>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <div className='my-3'>
                <Message>{error}</Message>
              </div>
            ) : (
              <Table striped bordered size='sm' variant='dark'>
                <thead>
                  <tr>
                    <th>Id Number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <Link to={`/employees/${user._id}`}>
                          {user.idNumber}
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/employees/${user._id}`}
                        >{`${user.lastname}, ${user.firstname}`}</Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.college}</td>
                      <td>{user.position}</td>

                      <td>
                        {" "}
                        {/* <LinkContainer to={`/users/${user._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer> */}
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeList;
