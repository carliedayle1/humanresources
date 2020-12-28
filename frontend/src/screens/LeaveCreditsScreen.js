import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Container, Row, Col, Button } from "react-bootstrap";
import ServiceCredits from "../components/ServiceCredits";
import VacationLeave from "../components/VacationLeave";
import SickLeave from "../components/SickLeave";
import LeaveCreditList from "../components/LeaveCreditList";
import SearchEmployee from "../components/SearchEmployee";
import { listUserLeaveCredits } from "../actions/leaveCreditActions";
import Swal from "sweetalert2";
import { LEAVE_CREATE_RESET } from "../constants/leaveCreditConstants";

const LeaveCreditsScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [position, setPosition] = useState("");

  const [showCredit, setShowCredit] = useState(false);

  const dispatch = useDispatch();

  const userSearch = useSelector((state) => state.userSearch);
  const { user } = userSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveCreditCreate = useSelector((state) => state.leaveCreditCreate);
  const { success } = leaveCreditCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (user && user._id) {
        setName(user.name);
        setCollege(user.college);
        setPosition(user.position);
        dispatch(listUserLeaveCredits(user._id));
      }

      if (success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch({ type: LEAVE_CREATE_RESET });
      }
    }
  }, [userInfo, history, user, success, showCredit, dispatch]);

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
    <>
      <h1>Leave Credits</h1>
      <Container className='bg-light rounded-lg py-3'>
        <h5>
          As of <strong>{dayjs().format("MMMM YYYY")}</strong>
        </h5>

        <SearchEmployee />

        {user && Object.keys(user).length > 0 && (
          <Container as={Row} className='mt-2 mb-5'>
            <Col sm={12} md={4}>
              <h5>
                Name :{" "}
                <strong>
                  {" "}
                  <Link to={`/employees/${user._id}`}>{name}</Link>{" "}
                </strong>
              </h5>
            </Col>
            <Col sm={12} md={4}>
              <h5>
                College : <strong>{college}</strong>
              </h5>
            </Col>
            <Col sm={12} md={4}>
              <h5>
                Position : <strong>{position}</strong>
              </h5>
            </Col>
          </Container>
        )}

        <hr className='my-4' />

        <Row>
          <Col xs={12} md={4}>
            <ServiceCredits userId={user._id ? user._id : ""} />
          </Col>
          <Col xs={12} md={4}>
            <VacationLeave userId={user._id ? user._id : ""} />
          </Col>
          <Col xs={12} md={4}>
            <SickLeave userId={user._id ? user._id : ""} />
          </Col>
        </Row>

        <hr className='my-4' />

        <Container>
          <Button variant='dark' size='lg' onClick={showCreditHandler}>
            {showCredit ? "Hide" : "Show"} Credit History
          </Button>

          {showCredit ? <LeaveCreditList /> : ""}
        </Container>
      </Container>
    </>
  );
};

export default LeaveCreditsScreen;
