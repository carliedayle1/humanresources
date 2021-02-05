import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_UPLOAD_DOCUMENT_FAIL,
  USER_UPLOAD_DOCUMENT_REQUEST,
  USER_UPLOAD_DOCUMENT_SUCCESS,
  USER_DOCUMENT_LIST_REQUEST,
  USER_DOCUMENT_LIST_SUCCESS,
  USER_DOCUMENT_LIST_FAIL,
  USER_DOCUMENT_LIST_RESET,
  USER_DELETE_DOCUMENT_REQUEST,
  USER_DELETE_DOCUMENT_SUCCESS,
  USER_DELETE_DOCUMENT_FAIL,
  USER_DELETE_DOCUMENT_RESET,
  USER_DOWNLOAD_DOCUMENT_REQUEST,
  USER_DOWNLOAD_DOCUMENT_SUCCESS,
  USER_DOWNLOAD_DOCUMENT_FAIL,
  USER_SEARCH_REQUEST,
  USER_SEARCH_SUCCESS,
  USER_SEARCH_FAIL,
  USER_SEARCH_RESET,
  USER_DOCUMENTS_REQUEST,
  USER_DOCUMENTS_SUCCESS,
  USER_DOCUMENTS_FAIL,
  USER_DOCUMENTS_RESET,
  USER_RANK_REQUEST,
  USER_RANK_SUCCESS,
  USER_RANK_FAIL,
  USER_RANK_RESET,
  USER_NOTIFICATION_REQUEST,
  USER_NOTIFICATION_SUCCESS,
  USER_NOTIFICATION_FAIL,
  USER_ADMINS_REQUEST,
  USER_ADMINS_SUCCESS,
  USER_ADMINS_FAIL,
  USER_ADMINS_RESET,
  USER_ALL_REQUEST,
  USER_ALL_SUCCESS,
  USER_ALL_FAIL,
  USER_ALL_RESET,
  USER_LEAVE_CREDITS_ALL_REQUEST,
  USER_LEAVE_CREDITS_ALL_SUCCESS,
  USER_LEAVE_CREDITS_ALL_FAIL,
  USER_LEAVE_CREDITS_ALL_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUploadDocumentReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPLOAD_DOCUMENT_REQUEST:
      return { ...state, loading: true };
    case USER_UPLOAD_DOCUMENT_SUCCESS:
      return { loading: false, success: true };
    case USER_UPLOAD_DOCUMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userDocumentListReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case USER_DOCUMENT_LIST_REQUEST:
      return { loading: true };
    case USER_DOCUMENT_LIST_SUCCESS:
      return { loading: false, documents: action.payload };
    case USER_DOCUMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_DOCUMENT_LIST_RESET:
      return {
        documents: [],
      };
    default:
      return state;
  }
};

export const userDeleteDocumentReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_DOCUMENT_REQUEST:
      return { loading: true };
    case USER_DELETE_DOCUMENT_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_DOCUMENT_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_DOCUMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const userDownloadDocumentReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DOWNLOAD_DOCUMENT_REQUEST:
      return { loading: true };
    case USER_DOWNLOAD_DOCUMENT_SUCCESS:
      return { loading: false, success: true };
    case USER_DOWNLOAD_DOCUMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSearchReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_SEARCH_REQUEST:
      return { ...state, loading: true };
    case USER_SEARCH_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case USER_SEARCH_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userRankReducer = (state = { ranks: [] }, action) => {
  switch (action.type) {
    case USER_RANK_REQUEST:
      return { loading: true };
    case USER_RANK_SUCCESS:
      return { loading: false, ranks: action.payload };
    case USER_RANK_FAIL:
      return { loading: false, error: action.payload };
    case USER_RANK_RESET:
      return { ranks: [] };
    default:
      return state;
  }
};

export const userDocumentsReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case USER_DOCUMENTS_REQUEST:
      return { loading: true };
    case USER_DOCUMENTS_SUCCESS:
      return { loading: false, documents: action.payload };
    case USER_DOCUMENTS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DOCUMENTS_RESET:
      return { documents: [] };
    default:
      return state;
  }
};

export const userUpdateNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_NOTIFICATION_REQUEST:
      return { loading: true };
    case USER_NOTIFICATION_SUCCESS:
      return { loading: false, success: true };
    case USER_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAdminsReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case USER_ADMINS_REQUEST:
      return { loading: true };
    case USER_ADMINS_SUCCESS:
      return { loading: false, admins: action.payload };
    case USER_ADMINS_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMINS_RESET:
      return { admins: [] };
    default:
      return state;
  }
};

export const usersAllReportReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ALL_REQUEST:
      return { loading: true };
    case USER_ALL_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_ALL_FAIL:
      return { loading: false, error: action.payload };
    case USER_ALL_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const usersAllCreditsReportReducer = (
  state = { leaveCredits: [] },
  action
) => {
  switch (action.type) {
    case USER_LEAVE_CREDITS_ALL_REQUEST:
      return { loading: true };
    case USER_LEAVE_CREDITS_ALL_SUCCESS:
      return { loading: false, leaveCredits: action.payload };
    case USER_LEAVE_CREDITS_ALL_FAIL:
      return { loading: false, error: action.payload };
    case USER_LEAVE_CREDITS_ALL_RESET:
      return { leaveCredits: [] };
    default:
      return state;
  }
};
