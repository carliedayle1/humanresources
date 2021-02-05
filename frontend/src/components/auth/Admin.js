import React from "react";
import { NavDropdown } from "react-bootstrap";

const Admin = () => {
  return (
    <>
      {/* <Nav.Link href='/profile' className='text-light'>
        Profile
      </Nav.Link> */}
      <NavDropdown
        title={<span className='text-light'>Employees</span>}
        id='employee'
      >
        <NavDropdown.Item href='/employees' className='text-light'>
          Employee List
        </NavDropdown.Item>
        <NavDropdown.Item href='/employees/create' className='text-light'>
          Create Employee
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        title={<span className='text-light'>Leave Credits</span>}
        id='leaveCredits'
      >
        <NavDropdown.Item href='/leavecredits/create' className='text-light'>
          Create leave credit
        </NavDropdown.Item>
        <NavDropdown.Item href='/leavecredits' className='text-light'>
          Leave credit history{" "}
        </NavDropdown.Item>
      </NavDropdown>
      <NavDropdown
        title={<span className='text-light'>Evaluation</span>}
        id='evaluation'
      >
        <NavDropdown.Item href='/evaluators/create' className='text-light'>
          Create evaluator
        </NavDropdown.Item>
        <NavDropdown.Item href='/evaluators' className='text-light'>
          Evaluator list
        </NavDropdown.Item>
        <NavDropdown.Item href='/evaluations/create' className='text-light'>
          Create evaluation
        </NavDropdown.Item>
        <NavDropdown.Item href='/evaluations/history' className='text-light'>
          Evaluation history
        </NavDropdown.Item>
        <NavDropdown.Item href='/evaluations/ratings' className='text-light'>
          Evaluation ratings history
        </NavDropdown.Item>
      </NavDropdown>

      {/* <Nav.Link className='text-light'>Logout</Nav.Link> */}
    </>
  );
};

export default Admin;
