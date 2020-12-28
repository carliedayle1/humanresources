import React, { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Swal from "sweetalert2";
import { deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
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

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (!users || users.length === 0) {
        dispatch(listUsers());
      }
    }
  }, [userInfo, history, dispatch, successDelete, users]);

  return (
    <Container>
      <h3>All Employees</h3>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='mt-3'>
          <thead>
            <tr>
              <th>Id Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>College</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <Link to={`/employees/${user._id}`}>{user.idNumber}</Link>
                </td>
                <td>
                  <Link to={`/employees/${user._id}`}>{user.name}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.college}</td>
                <td>{user.position}</td>

                <td>
                  {" "}
                  <LinkContainer to={`/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
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
    </Container>
  );
};

export default UserListScreen;
