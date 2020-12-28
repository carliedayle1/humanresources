import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { searchUser } from "../actions/userActions";
import { useForm } from "react-hook-form";

const SearchEmployee = () => {
  const [search, setSearch] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch();

  const userSearch = useSelector((state) => state.userSearch);
  const { loading, error } = userSearch;

  const searchSubmitHandler = () => {
    if (search.trim()) {
      dispatch(searchUser(search));
    }
  };

  return (
    <>
      <Container className='d-flex justify-content-center py-3'>
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
      </Container>
    </>
  );
};

export default SearchEmployee;
