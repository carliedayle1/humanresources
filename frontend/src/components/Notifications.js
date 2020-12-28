import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { updateNotification } from "../actions/userActions";

const Notifications = ({ id }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { notifications } = userInfo;

  if (notifications.length !== undefined && notifications.length > 0) {
    notifications.filter((not) => not.seen === false);
  }

  const updateNotificationHandler = (id) => {
    dispatch(updateNotification(id));
  };

  return (
    <>
      <NavDropdown
        title={
          <>
            <i className='fas fa-bell mx-1'></i>

            {notifications.length > 0 && (
              <Badge variant='secondary'>{notifications.length}</Badge>
            )}
          </>
        }
        id='notifications'
      >
        {notifications.length > 0 &&
          notifications.map((notify) => {
            return (
              <LinkContainer to={notify.url} key={notify._id}>
                <NavDropdown.Item
                  onClick={() => updateNotificationHandler(notify._id)}
                >
                  {notify.message}
                </NavDropdown.Item>
              </LinkContainer>
            );
          })}
      </NavDropdown>
    </>
  );
};

export default Notifications;
