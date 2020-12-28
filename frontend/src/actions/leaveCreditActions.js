import axios from "axios";
import {
  LEAVE_CREATE_FAIL,
  LEAVE_CREATE_REQUEST,
  LEAVE_CREATE_SUCCESS,
  LEAVE_LIST_FAIL,
  LEAVE_LIST_REQUEST,
  LEAVE_LIST_SUCCESS,
  LEAVE_USER_LIST_FAIL,
  LEAVE_USER_LIST_REQUEST,
  LEAVE_USER_LIST_SUCCESS,
} from "../constants/leaveCreditConstants";

export const createLeaveCredit = (leaveCredit, id) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: LEAVE_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    console.log(id);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/leavecredits/${id}`, leaveCredit, config);

    dispatch({
      type: LEAVE_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserLeaveCredits = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEAVE_USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/leavecredits/${id}`, config);

    dispatch({
      type: LEAVE_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLeaveCredits = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LEAVE_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/leavecredits`, config);

    dispatch({
      type: LEAVE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAVE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
