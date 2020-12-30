import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
  userDetailsReducer,
  userUpdateReducer,
  userUpdateProfileReducer,
  userUploadDocumentReducer,
  userDocumentListReducer,
  userDeleteDocumentReducer,
  userDownloadDocumentReducer,
  userSearchReducer,
  userRankReducer,
  userDocumentsReducer,
  userUpdateNotificationReducer,
} from "./reducers/userReducers";

import {
  leaveCreditCreateReducer,
  leaveCreditUserListReducer,
  leaveCreditListReducer,
} from "./reducers/leaveCreditReducers";

import {
  evaluationRatingCreateReducer,
  evaluationRatingListReducer,
  evaluationCreateReducer,
  evaluatorListReducer,
  evaluationListReducer,
  evaluationUserListReducer,
  evaluationRatingsListReducer,
  evaluationRatingsListAllReducer,
} from "./reducers/evaluationReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userRank: userRankReducer,
  userUploadDocument: userUploadDocumentReducer,
  userDocuments: userDocumentsReducer,
  userDocumentList: userDocumentListReducer,
  userDeleteDocument: userDeleteDocumentReducer,
  userDownloadDocument: userDownloadDocumentReducer,
  userUpdateNotification: userUpdateNotificationReducer,
  userSearch: userSearchReducer,
  leaveCreditCreate: leaveCreditCreateReducer,
  leaveCreditList: leaveCreditListReducer,
  leaveCreditUserList: leaveCreditUserListReducer,
  evaluationCreate: evaluationCreateReducer,
  evaluationRatingCreate: evaluationRatingCreateReducer,
  evaluationRatingList: evaluationRatingListReducer,
  evaluatorList: evaluatorListReducer,
  evaluationList: evaluationListReducer,
  evaluationUserList: evaluationUserListReducer,
  evaluationRatingsList: evaluationRatingsListReducer,
  evaluationRatingsListAll: evaluationRatingsListAllReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
