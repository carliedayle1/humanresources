import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const Rating = () => {
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Evaluation Rating</h1>

          <hr className='bg-light' />
          <div className='px-5'>
            <h5>
              As of <strong>February 1, 2021</strong>
            </h5>

            <div className='d-flex justify-content-center align-items center'>
              <Form>
                <Form.Group as={Row} controlId='search'>
                  <Form.Label column sm={4} className='text-light'>
                    ID Number/Email
                  </Form.Label>
                  <Col sm={7}>
                    <Form.Control type='text' />
                  </Col>
                  <Col sm={1}>
                    <Button variant='danger' type='submit'>
                      Search
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>

            <hr className='bg-light' />

            <div>
              <Row className='text-light'>
                <Col sm={2}>
                  <h5>ID Number:</h5>
                </Col>
                <Col sm={4}>
                  <h5>123456789</h5>
                </Col>
                <Col sm={2}>
                  <h5>Position:</h5>
                </Col>
                <Col sm={4}>
                  <h5>TEACHER</h5>
                </Col>
                <Col sm={2}>
                  <h5>Name:</h5>
                </Col>
                <Col sm={4}>
                  <h5>ERICK DAYLE ROSALES LOON</h5>
                </Col>
                <Col sm={2}>
                  <h5>Rank:</h5>
                </Col>
                <Col sm={4}>
                  <h5>TEACHER 2</h5>
                </Col>
              </Row>
            </div>

            <hr className='bg-light' />

            <div className='d-flex justify-content-center'>
              <div>
                <Form className='mt-3'>
                  <Form.Group as={Row}>
                    <Form.Label column sm='6'>
                      Educational Qualification
                    </Form.Label>
                    <Col sm='6'>
                      <Form.Control type='number' />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='6'>
                      Academic Experience
                    </Form.Label>
                    <Col sm='6'>
                      <Form.Control type='number' />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='6'>
                      Professional Achievement
                    </Form.Label>
                    <Col sm='6'>
                      <Form.Control type='number' />
                    </Col>
                  </Form.Group>
                  <div className='text-center'>
                    <Button className='btn btn-info shadow-lg' type='submit'>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Rating;
