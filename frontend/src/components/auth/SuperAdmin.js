import React from "react";
import { NavDropdown } from "react-bootstrap";

const SuperAdmin = () => {
  return (
    <>
      <NavDropdown title={<span className='text-light'>Admin</span>} id='admin'>
        <NavDropdown.Item href='/admin/create' className='text-light'>
          Create Admin
        </NavDropdown.Item>
        <NavDropdown.Item href='/admin' className='text-light'>
          Admin List
        </NavDropdown.Item>
      </NavDropdown>
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
