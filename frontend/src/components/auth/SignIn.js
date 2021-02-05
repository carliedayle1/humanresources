import React from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import Swal from "sweetalert2";

const SignIn = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <>
      {userInfo && !userInfo.isEvaluator && (
        <Nav.Link href='/profile' className='text-light'>
          Profile
        </Nav.Link>
      )}
      <Nav.Link className='text-light' onClick={logoutHandler}>
        Logout
      </Nav.Link>
    </>
  );
};

export default SignIn;
