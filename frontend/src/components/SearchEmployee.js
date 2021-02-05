import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { searchUser } from "../actions/userActions";

const SearchEmployee = () => {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userSearch = useSelector((state) => state.userSearch);
  const { loading, error, user } = userSearch;

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (search === "") {
      setMessage("Search input is required...");
      return;
    } else {
      if (search.trim()) {
        dispatch(searchUser(search));
      }
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items center'>
        <Form onSubmit={searchSubmitHandler}>
          <Form.Group as={Row} controlId='search'>
            <Form.Label column sm={4} className='text-light'>
              ID Number
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col sm={1}>
              {loading ? (
                <Loader />
              ) : (
                <Button variant='danger' type='submit'>
                  Search
                </Button>
              )}
            </Col>
          </Form.Group>
          {error && (
            <div className='mt-3'>
              <Message>{error}</Message>
            </div>
          )}

          {message && (
            <div className='mt-3'>
              <Message>{message}</Message>
            </div>
          )}
        </Form>
      </div>

      <hr className='bg-light' />

      {user && user.idNumber && (
        <div>
          <Row className='text-light'>
            <Col sm={2}>
              <h5>ID Number:</h5>
            </Col>
            <Col sm={4}>
              <Link to={`/employees/${user._id}`}>
                {" "}
                <h5>{user && user.idNumber ? user.idNumber : ""}</h5>{" "}
              </Link>
            </Col>
            <Col sm={2}>
              <h5>Position:</h5>
            </Col>
            <Col sm={4}>
              <h5>{user && user.position ? user.position : ""}</h5>
            </Col>
            <Col sm={2}>
              <h5>Name:</h5>
            </Col>
            <Col sm={4}>
              <h5>
                {user && user.firstname
                  ? `${user.firstname} ${user.middlename} ${user.lastname}`
                  : ""}
              </h5>
            </Col>
            <Col sm={2}>
              <h5>Rank:</h5>
            </Col>
            <Col sm={4}>
              <h5>{user && user.rank ? user.rank : ""}</h5>
            </Col>
          </Row>
        </div>
      )}

      {/* <Container className='d-flex justify-content-center py-3'>
        <Form className='w-50' onSubmit={handleSubmit(searchSubmitHandler)}>
          <Form.Group as={Row} controlId='particular'>
            <Form.Label column sm={3} className='text-dark'>
              Id Number
            </Form.Label>
            <Col sm={7}>
              <Form.Control
                type='text'
                value={search}
                ref={register({
                  required: true,
                })}
                name='idNumber'
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col sm={2}>
              {loading ? (
                <Loader />
              ) : (
                <Button variant='warning' type='submit'>
                  Search
                </Button>
              )}
            </Col>
          </Form.Group>
          {errors.idNumber?.type === "required" && (
            <p className='text-danger m-0'>Input required!</p>
          )}
          {error && <Message variant='danger'>{error}</Message>}
        </Form>
      </Container> */}
    </>
  );
};

export default SearchEmployee;
