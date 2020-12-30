import React from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import Meta from "../components/Meta";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Meta />

      <div className='jumbotron mt-5'>
        <div className='d-flex flex-row justify-content-between'>
          <div className='align-self-end'>
            <h4 className='display-7'>BOHOL ISLAND UNIVERSITY</h4>
          </div>

          {userInfo ? (
            <div
              className='position-absolute'
              style={{ left: "73%", bottom: "72%" }}
            >
              <Image
                src='/images/logo.png'
                roundedCircle
                height={130}
                width={130}
                className='bg-dark'
              />
            </div>
          ) : (
            <div
              className='position-absolute'
              style={{ left: "68%", bottom: "70%" }}
            >
              <Image
                src='/images/logo.png'
                roundedCircle
                height={150}
                width={150}
                className='bg-dark'
              />
            </div>
          )}
        </div>

        <h1 className='display-4'>PERSONNEL INFORMATION SYSTEM</h1>
        <h5 className='display-8'>
          {" "}
          Raising S&T Education to Global Standards
        </h5>

        <hr className='my-4' />
        <p>
          BISU is committed to provide quality higher education in the arts and
          sciences, as well as in professional and technological fields;
          undertake research and development and extension services for the
          sustainable development of Bohol and the country
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
