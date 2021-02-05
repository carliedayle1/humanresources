import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const CreateAdmin = () => {
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Admin Creation</h1>
          <hr className='bg-light' />

          <div className='px-5'>
            <Form className='text-light'>
              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  ID Number:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='1234567890'
                    className='text-dark'
                  />
                </Col>
                <Form.Label column sm='2'>
                  Date Hired:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control type='date' className='text-dark' />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  First name:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='ERICK DAYLE'
                    className='text-dark'
                  />
                </Col>
                <Form.Label column sm='2'>
                  Email:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='daylecarlie@gmail.com'
                    className='text-dark'
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Middle name:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control defaultValue='ROSALES' className='text-dark' />
                </Col>
                <Form.Label column sm='2'>
                  Position:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control defaultValue='TEACHER' className='text-dark' />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Last name:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control defaultValue='LOON' className='text-dark' />
                </Col>
                <Form.Label column sm='2'>
                  Rank:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='TEACHER 1'
                    className='text-dark'
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Campus:
                </Form.Label>

                <Col sm={4}>
                  <select className='form-control' id='campus'>
                    <option>Balilihan</option>
                    <option>Bilar</option>
                    <option>Calape</option>
                    <option>Candijay</option>
                    <option>Clarin</option>
                    <option>Tagbilaran City</option>
                  </select>
                </Col>

                {/* <Form.Label column sm='2'>
                  Campus:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='TAGBILARAN CITY'
                    className='text-dark'
                  />
                </Col> */}
                <Form.Label column sm='2'>
                  College:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='COLLEGE OF COMPUTER STUDIES'
                    className='text-dark'
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm='2'>
                  Password:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    type='password'
                    disabled
                    className='text-dark'
                  />
                  <p>
                    Default password of the employee will be their
                    <strong> LAST NAME IN UPPERCASE</strong>
                  </p>
                </Col>
                <Form.Label column sm='2'>
                  Program:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='COMPUTER LITERATURE'
                    className='text-dark'
                  />
                </Col>
              </Form.Group>

              <div className='text-center'>
                <Button className='btn btn-lg btn-info shadow-lg'>
                  Create
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateAdmin;
