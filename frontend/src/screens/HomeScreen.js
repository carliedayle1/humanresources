import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Meta />
      <div className='jumbotron'>
        <h1 className='display-3'>
          {userInfo && userInfo.campus !== undefined
            ? userInfo.campus
            : "Human Resources Management System"}
        </h1>
        <p className='lead'>Enim velit dolor eu aute eiusmod.</p>
        <hr className='my-4' />
        <p>
          Excepteur veniam dolor culpa nostrud adipisicing esse sint deserunt
          tempor ullamco laboris. Aliquip aliquip ex mollit sint ex. Pariatur
          laborum deserunt ad sunt consequat sunt velit Lorem labore et.
        </p>
        {!userInfo && (
          <p className='lead'>
            <Link
              className='btn btn-secondary btn-lg'
              to='/login'
              role='button'
            >
              Sign In
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
