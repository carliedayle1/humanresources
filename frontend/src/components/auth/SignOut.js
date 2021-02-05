import React from "react";
import { Nav } from "react-bootstrap";

const SignOut = () => {
  return (
    <>
      <Nav.Link href='/login' className='text-light'>
        Log In
      </Nav.Link>
    </>
  );
};

export default SignOut;
