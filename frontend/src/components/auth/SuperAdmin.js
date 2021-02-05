import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";

const SuperAdmin = () => {
  return (
    <>
      <Nav.Link href='/admin/create' className='text-light'>
        Create Admin
      </Nav.Link>
      <NavDropdown
        title={<span className='text-light'>Reports</span>}
        id='employee'
      >
        <NavDropdown.Item href='/employees/report' className='text-light'>
          Employees
        </NavDropdown.Item>
        <NavDropdown.Item href='/leavecredits/report' className='text-light'>
          Leave Credits
        </NavDropdown.Item>
      </NavDropdown>

      {/* <Nav.Link className='text-light'>Logout</Nav.Link> */}
    </>
  );
};

export default SuperAdmin;
