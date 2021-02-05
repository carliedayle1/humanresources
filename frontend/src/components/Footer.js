import React from "react";
import { Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Navbar
        bg='light'
        className='d-flex justify-content-center'
        fixed='bottom'
      >
        <p className='text-dark py-2 m-0'>
          Copyright &copy; Personnel Information System 2021
        </p>
      </Navbar>
    </footer>
  );
};

export default Footer;
