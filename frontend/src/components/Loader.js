import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ color }) => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        display: "block",
      }}
      className={color}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

Loader.defaultProps = {
  color: "text-primary",
};

export default Loader;
