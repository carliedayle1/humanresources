import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createLeaveCredit,
  listUserLeaveCredits,
} from "../../actions/leaveCreditActions";
import Swal from "sweetalert2";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import SearchEmployee from "../../components/SearchEmployee";
import LeaveCreditList from "../../components/LeaveCreditList";
import dayjs from "dayjs";

const CreateLeaveCredit = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userSearch = useSelector((state) => state.userSearch);
  const { user } = userSearch;

  const leaveCreditCreate = useSelector((state) => state.leaveCreditCreate);
  const { loading, error, success } = leaveCreditCreate;

  const [particulars, setParticulars] = useState("");
  const [serviceEarned, setServiceEarned] = useState(0);
  const [serviceAbsence, setServiceAbsence] = useState(0);

  const [vacationEarned, setVacationEarned] = useState(0);
  const [vacationAbsence, setVacationAbsence] = useState(0);

  const [sickEarned, setSickEarned] = useState(0);
  const [sickAbsence, setSickAbsence] = useState(0);

  const [message, setMessage] = useState("");
  const [showCredit, setShowCredit] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/");
    } else {
      if (user && user._id) {
        dispatch(listUserLeaveCredits(user._id));
      }
    }
  }, [history, userInfo, user, success, dispatch]);

  const serviceSubmitHandler = (e) => {
    e.preventDefault();
    setMessage("");

    if (!user || !user._id) {
      setMessage("Please search for an employee..");
      return;
    } else {
      dispatch(
        createLeaveCredit(
          {
            type: "Service",
            particular: particulars,
            earned: Number(serviceEarned),
            absences: Number(serviceAbsence),
            balance: Number(serviceEarned - serviceAbsence),
            user: user._id,
            createdBy: `${userInfo.lastname}, ${userInfo.firstname} `,
          },
          user._id
        )
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Leave credit saved!",
        showConfirmButton: false,
        timer: 1500,
      });

      setServiceAbsence(0);
      setParticulars("");
      setServiceEarned(0);
      history.push(`/employees/${user._id}`);
    }
  };

  const vacationSubmitHandler = (e) => {
    e.preventDefault();
    setMessage("");

    if (!user || !user._id) {
      setMessage("Please search for an employee first..");
      return;
    } else {
      dispatch(
        createLeaveCredit(
          {
            type: "Vacation",
            earned: Number(vacationEarned),
            absences: Number(vacationAbsence),
            balance: Number(vacationEarned - vacationAbsence),
            user: user._id,
            createdBy: `${userInfo.lastname}, ${userInfo.firstname} `,
          },
          user._id
        )
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Leave credit saved!",
        showConfirmButton: false,
        timer: 1500,
      });

      setVacationAbsence(0);
      setVacationEarned(0);
      history.push(`/employees/${user._id}`);
    }
  };

  const sickSubmitHandler = (e) => {
    e.preventDefault();
    setMessage("");

    if (!user || !user._id) {
      setMessage("Please search for an employee..");
      return;
    } else {
      dispatch(
        createLeaveCredit(
          {
            type: "Sick",
            earned: Number(sickEarned),
            absences: Number(sickAbsence),
            balance: Number(sickEarned - sickAbsence),
            user: user._id,
            createdBy: `${userInfo.lastname}, ${userInfo.firstname} `,
          },
          user._id
        )
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Leave credit saved!",
        showConfirmButton: false,
        timer: 1500,
      });

      setSickAbsence(0);
      setSickEarned(0);
      history.push(`/employees/${user._id}`);
    }
  };

  const showCreditHandler = () => {
    if (user._id === undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must input or search an employee first",
      });
    } else {
      setShowCredit(!showCredit);
    }
  };

  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body>
          <h1 className='text-light'>Leave Credit</h1>
          <hr className='bg-light' />

          <div className='px-5'>
            <h5 className='text-light'>
              As of <strong>{dayjs().format("MMMM YYYY")}</strong>{" "}
            </h5>

            <SearchEmployee />

            <hr className='bg-light' />

            {message && (
              <div className='my-3 px-5'>
                <Message>{message}</Message>
              </div>
            )}
            {error && (
              <div className='my-3 px-5'>
                <Message>{error}</Message>
              </div>
            )}

            <Row className='text-light '>
              <Col sm={4}>
                <h4 className='text-center'>Service Credit</h4>
                <Form className='mt-3' onSubmit={serviceSubmitHandler}>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Particulars
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='text'
                        value={particulars}
                        onChange={(e) => setParticulars(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Earned
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={serviceEarned}
                        onChange={(e) => setServiceEarned(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Absences
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={serviceAbsence}
                        onChange={(e) => setServiceAbsence(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Total
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        disabled
                        value={serviceEarned - serviceAbsence}
                      />
                    </Col>
                  </Form.Group>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className='text-center'>
                      <Button className='btn btn-info' type='submit'>
                        Submit
                      </Button>
                    </div>
                  )}
                </Form>
              </Col>

              <Col sm={4}>
                <h4 className='text-center'>Vacation Leave</h4>
                <Form className='mt-3' onSubmit={vacationSubmitHandler}>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Earned
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={vacationEarned}
                        onChange={(e) => setVacationEarned(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Absences
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={vacationAbsence}
                        onChange={(e) => setVacationAbsence(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Total
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        disabled
                        value={vacationEarned - vacationAbsence}
                      />
                    </Col>
                  </Form.Group>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className='text-center'>
                      <Button className='btn btn-info' type='submit'>
                        Submit
                      </Button>
                    </div>
                  )}
                </Form>
              </Col>

              <Col sm={4}>
                <h4 className='text-center'>Sick Leave</h4>
                <Form className='mt-3' onSubmit={sickSubmitHandler}>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Earned
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={sickEarned}
                        onChange={(e) => setSickEarned(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Absences
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        step='.01'
                        value={sickAbsence}
                        onChange={(e) => setSickAbsence(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Total
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control
                        type='number'
                        disabled
                        value={sickEarned - sickAbsence}
                      />
                    </Col>
                  </Form.Group>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className='text-center'>
                      <Button className='btn btn-info' type='submit'>
                        Submit
                      </Button>
                    </div>
                  )}
                </Form>
              </Col>
            </Row>

            <hr className='bg-light' />

            <Button
              className='btn btn-lg btn-success'
              onClick={showCreditHandler}
            >
              {showCredit ? "Hide" : "Show"} Credit History
            </Button>

            <br />

            {showCredit ? (
              <div>
                <LeaveCreditList />
                {/* <LeaveCreditExcel filename={`${name} leave credit list`} /> */}
              </div>
            ) : (
              ""
            )}

            {/* <Table striped bordered size='sm' variant='dark' className='mt-3'>
              <thead>
                <tr>
                  <th>Credit Type</th>
                  <th>Earned</th>
                  <th>Absences</th>
                  <th>Total</th>
                  <th>Date Credited</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service Credit</td>
                  <td>1</td>
                  <td>1</td>
                  <td>2</td>

                  <td>February 1, 2021</td>
                </tr>
              </tbody>
            </Table> */}
          </div>
        </Card.Body>
      </Card>
      <br />
      <br />
    </div>
  );
};

export default CreateLeaveCredit;
