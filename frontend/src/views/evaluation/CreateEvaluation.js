import React from "react";
import { Card, Form, Col, Row, Button, Table } from "react-bootstrap";

const CreateEvaluation = () => {
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Create Evaluation</h1>

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

            <div>
              <h4>Evaluation Ratings</h4>
              <Table striped bordered size='sm' variant='dark' className='mt-3'>
                <thead>
                  <tr>
                    <th>Educational Qualification</th>
                    <th>Academic Experience</th>
                    <th>Professional Achievement</th>
                    <th>Rated By</th>
                    <th>Date Rated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>30</td>
                    <td>30</td>
                    <td>30</td>
                    <td>ERICK DAYLE LOON</td>
                    <td>February 1, 2021</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <hr className='bg-light' />

            <div className='d-flex justify-content-center'>
              <div>
                <Form className='mt-3'>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Total Points
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control type='number' />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      QCE Points
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control type='number' />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm='4'>
                      Rank
                    </Form.Label>
                    <Col sm='8'>
                      <Form.Control type='text' />
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

            <hr className='bg-light' />

            <div>
              <div className='d-flex justify-content-between'>
                <Button className='btn btn-lg btn-danger'>
                  Show evaluation history
                </Button>
                <Button className='btn btn-lg btn-success'>
                  Export to excel
                </Button>
              </div>

              <Table striped bordered size='sm' variant='dark' className='mt-3'>
                <thead>
                  <tr>
                    <th>Total Points</th>
                    <th>QCE Points</th>
                    <th>Rank</th>
                    <th>Verified By</th>
                    <th>Date Verified</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>200</td>
                    <td>50</td>
                    <td>TEACHER 2</td>
                    <td>ERICK DAYLE LOON</td>
                    <td>February 1, 2021</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Card.Body>
      </Card>

      <br />
      <br />
      <br />
    </div>
  );
};

export default CreateEvaluation;
