import {
  LEAVE_CREATE_FAIL,
  LEAVE_CREATE_REQUEST,
  LEAVE_CREATE_RESET,
  LEAVE_CREATE_SUCCESS,
  LEAVE_LIST_FAIL,
  LEAVE_LIST_REQUEST,
  LEAVE_LIST_RESET,
  LEAVE_LIST_SUCCESS,
  LEAVE_USER_LIST_FAIL,
  LEAVE_USER_LIST_REQUEST,
  LEAVE_USER_LIST_RESET,
  LEAVE_USER_LIST_SUCCESS,
} from "../constants/leaveCreditConstants";

export const leaveCreditCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_CREATE_REQUEST:
      return { loading: true };
    case LEAVE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case LEAVE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveCreditUserListReducer = (
  state = { leaveCredits: [] },
  action
) => {
  switch (action.type) {
    case LEAVE_USER_LIST_REQUEST:
      return { loading: true };
    case LEAVE_USER_LIST_SUCCESS:
      return { loading: false, leaveCredits: action.payload };
    case LEAVE_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_USER_LIST_RESET:
      return {
        leaveCredits: [],
      };
    default:
      return state;
  }
};

export const leaveCreditListReducer = (
  state = { leaveCredits: [] },
  action
) => {
  switch (action.type) {
    case LEAVE_LIST_REQUEST:
      return { loading: true };
    case LEAVE_LIST_SUCCESS:
      return { loading: false, leaveCredits: action.payload };
    case LEAVE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_LIST_RESET:
      return {
        leaveCredits: [],
      };
    default:
      return state;
  }
};
