import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";

const CreateEvaluator = () => {
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <h1>Create Evaluator</h1>
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
                  First name:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control
                    defaultValue='ERICK DAYLE'
                    className='text-dark'
                  />
                </Col>
                <Form.Label column sm='2'>
                  Middle name:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control defaultValue='ROSALES' className='text-dark' />
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
                  Password:
                </Form.Label>
                <Col sm='4'>
                  <Form.Control type='password' className='text-dark' />
                  <p>
                    Default password is the{" "}
                    <strong>LAST NAME of the EMPLOYEE</strong>
                  </p>
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

export default CreateEvaluator;
