import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const UserProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <>
      <h1>Profile</h1>
    </>
  );
};

export default UserProfileScreen;
