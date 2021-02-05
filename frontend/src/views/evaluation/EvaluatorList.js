import React from "react";
import { Card, Button, Table } from "react-bootstrap";

const EvaluatorList = () => {
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <div className='d-flex justify-content-between'>
            <h1>Evaluator List</h1>
            <Button className='btn btn-success'>Download report</Button>
          </div>

          <hr className='bg-light' />

          <div className='px-5'>
            <Table striped bordered size='sm' variant='dark' className='mt-3'>
              <thead>
                <tr>
                  <th>ID Number</th>

                  <th>Evaluator Name</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123455678</td>
                  <td>ERICK DAYLE LOON</td>

                  <td>February 1, 2021</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EvaluatorList;
