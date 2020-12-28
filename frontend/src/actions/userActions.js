import axios from "axios";
import {
  EVALUATION_EVALUATOR_LIST_RESET,
  EVALUATION_LIST_REQUEST,
  EVALUATION_RATINGS_RESET,
  EVALUATION_RATING_LIST_RESET,
  EVALUATION_USER_LIST_RESET,
} from "../constants/evaluationConstants";
import {
  LEAVE_LIST_RESET,
  LEAVE_USER_LIST_RESET,
} from "../constants/leaveCreditConstants";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_LIST_RESET,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPLOAD_DOCUMENT_REQUEST,
  USER_UPLOAD_DOCUMENT_SUCCESS,
  USER_UPLOAD_DOCUMENT_FAIL,
  USER_DOCUMENT_LIST_REQUEST,
  USER_DOCUMENT_LIST_SUCCESS,
  USER_DOCUMENT_LIST_FAIL,
  USER_DELETE_DOCUMENT_REQUEST,
  USER_DELETE_DOCUMENT_SUCCESS,
  USER_DELETE_DOCUMENT_FAIL,
  USER_DOWNLOAD_DOCUMENT_REQUEST,
  USER_DOWNLOAD_DOCUMENT_SUCCESS,
  USER_DOWNLOAD_DOCUMENT_FAIL,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_DOCUMENT_LIST_RESET,
  USER_RANK_REQUEST,
  USER_RANK_SUCCESS,
  USER_RANK_FAIL,
  USER_RANK_RESET,
  USER_DOCUMENTS_REQUEST,
  USER_DOCUMENTS_SUCCESS,
  USER_DOCUMENTS_FAIL,
  USER_DOCUMENTS_RESET,
  USER_NOTIFICATION_REQUEST,
  USER_NOTIFICATION_SUCCESS,
  USER_NOTIFICATION_FAIL,
} from "../constants/userConstants";

export const login = (idNumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { idNumber, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });

  dispatch({
    type: USER_LIST_RESET,
  });

  dispatch({
    type: USER_DOCUMENT_LIST_RESET,
  });

  dispatch({
    type: LEAVE_LIST_RESET,
  });

  dispatch({
    type: LEAVE_USER_LIST_RESET,
  });

  dispatch({
    type: EVALUATION_RATING_LIST_RESET,
  });

  dispatch({
    type: EVALUATION_EVALUATOR_LIST_RESET,
  });

  dispatch({
    type: EVALUATION_LIST_REQUEST,
  });

  dispatch({
    type: EVALUATION_USER_LIST_RESET,
  });

  dispatch({
    type: USER_RANK_RESET,
  });

  dispatch({
    type: USER_DOCUMENTS_RESET,
  });

  dispatch({
    type: EVALUATION_RATINGS_RESET,
  });
};

export const registerUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
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

    const { data } = await axios.post("/api/users", user, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUpdateProfileDetails = (user) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userUploadDoc = (document) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPLOAD_DOCUMENT_REQUEST,
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

    await axios.post(`/api/documents`, document, config);

    dispatch({
      type: USER_UPLOAD_DOCUMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_UPLOAD_DOCUMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDocuments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DOCUMENT_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/documents`, config);

    dispatch({
      type: USER_DOCUMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DOCUMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDocument = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_DOCUMENT_REQUEST,
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

    await axios.delete(`/api/documents/${id}`, config);

    dispatch({
      type: USER_DELETE_DOCUMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_DOCUMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downloadDocument = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DOWNLOAD_DOCUMENT_REQUEST,
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

    await axios.get(`/api/documents/${id}`, config);

    dispatch({
      type: USER_DOWNLOAD_DOCUMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DOWNLOAD_DOCUMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchUser = (idNumber) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SEARCH_REQUEST,
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

    const { data } = await axios.get(`/api/users/search/${idNumber}`, config);

    dispatch({
      type: USER_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserRanks = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_RANK_REQUEST,
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

    const { data } = await axios.get(`/api/users/${id}/ranks`, config);

    dispatch({
      type: USER_RANK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_RANK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEmployeeDocuments = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DOCUMENTS_REQUEST,
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

    const { data } = await axios.get(`/api/documents/${id}`, config);

    dispatch({
      type: USER_DOCUMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DOCUMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNotification = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_NOTIFICATION_REQUEST,
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

    await axios.get(`/api/users/notifications/${id}`, config);

    dispatch({
      type: USER_NOTIFICATION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_NOTIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
