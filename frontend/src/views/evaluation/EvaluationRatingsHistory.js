import React from "react";
import { Card, Button, Table } from "react-bootstrap";

const EvaluationRatingsHistory = () => {
  return (
    <div style={{ marginTop: "8%" }}>
      <Card>
        <Card.Body className='text-light'>
          <div className='d-flex justify-content-between'>
            <h1>Evaluation Ratings History</h1>
            <Button className='btn btn-success'>Download report</Button>
          </div>
          <hr className='bg-light' />

          <div className='px-5'>
            <Table striped bordered size='sm' variant='dark' className='mt-3'>
              <thead>
                <tr>
                  <th>ID Number</th>
                  <th>Employee Name</th>
                  <th>Educational Qualification</th>
                  <th>Academic Experience</th>
                  <th>Professional Achievement</th>
                  <th>Verified</th>
                  <th>Evaluated By</th>
                  <th>Date Evaluated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1234567890</td>
                  <td>ERICK DAYLE LOON</td>
                  <td>200</td>
                  <td>100</td>
                  <td>100</td>
                  <td>YES</td>
                  <td>ADMIN</td>
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

export default EvaluationRatingsHistory;
