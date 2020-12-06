import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Meta />
      <div className='jumbotron'>
        <h1 className='display-3'>
          {userInfo ? "Dashboard" : "Content here!"}
        </h1>
        <p className='lead'>Human Resources Management System</p>
        <hr className='my-4' />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className='lead'>
          <Link className='btn btn-primary btn-lg' to='/' role='button'>
            Learn more
          </Link>
        </p>
      </div>
    </>
  );
};

export default HomeScreen;
