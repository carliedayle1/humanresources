import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listEvaluators } from "../actions/evaluationActions";
// import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import Swal from "sweetalert2";
// import { deleteUser } from "../actions/userActions";

const EvaluatorListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const evaluatorList = useSelector((state) => state.evaluatorList);
  const { loading, error, evaluators } = evaluatorList;

  //   const deleteHandler = (id) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         dispatch(deleteUser(id));
  //         Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //       }
  //     });
  //   };

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
