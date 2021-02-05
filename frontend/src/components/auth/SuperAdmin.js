import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";

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
      <Nav.Link href='/admin/reports' className='text-light'>
        Reports
      </Nav.Link>

      {/* <Nav.Link className='text-light'>Logout</Nav.Link> */}
    </>
  );
};

export default SuperAdmin;
