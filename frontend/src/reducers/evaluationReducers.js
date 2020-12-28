import {
  EVALUATION_RATING_CREATE_REQUEST,
  EVALUATION_RATING_CREATE_SUCCESS,
  EVALUATION_RATING_CREATE_FAIL,
  EVALUATION_RATING_CREATE_RESET,
  EVALUATION_RATING_LIST_REQUEST,
  EVALUATION_RATING_LIST_SUCCESS,
  EVALUATION_RATING_LIST_FAIL,
  EVALUATION_RATING_LIST_RESET,
  EVALUATION_CREATE_REQUEST,
  EVALUATION_CREATE_SUCCESS,
  EVALUATION_CREATE_FAIL,
  EVALUATION_EVALUATOR_LIST_RESET,
  EVALUATION_EVALUATOR_LIST_FAIL,
  EVALUATION_EVALUATOR_LIST_SUCCESS,
  EVALUATION_EVALUATOR_LIST_REQUEST,
  EVALUATION_LIST_REQUEST,
  EVALUATION_LIST_SUCCESS,
  EVALUATION_LIST_FAIL,
  EVALUATION_LIST_RESET,
  EVALUATION_USER_LIST_REQUEST,
  EVALUATION_USER_LIST_SUCCESS,
  EVALUATION_USER_LIST_FAIL,
  EVALUATION_USER_LIST_RESET,
  EVALUATION_RATINGS_REQUEST,
  EVALUATION_RATINGS_SUCCESS,
  EVALUATION_RATINGS_FAIL,
  EVALUATION_RATINGS_RESET,
} from "../constants/evaluationConstants";

export const evaluationRatingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUATION_RATING_CREATE_REQUEST:
      return { loading: true };
    case EVALUATION_RATING_CREATE_SUCCESS:
      return { loading: false, success: true };
    case EVALUATION_RATING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVALUATION_RATING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const evaluationRatingListReducer = (
  state = { ratings: [] },
  action
) => {
  switch (action.type) {
    case EVALUATION_RATING_LIST_REQUEST:
      return { loading: true };
    case EVALUATION_RATING_LIST_SUCCESS:
      return { loading: false, ratings: action.payload };
    case EVALUATION_RATING_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EVALUATION_RATING_LIST_RESET:
      return {
        ratings: [],
      };
    default:
      return state;
  }
};

export const evaluationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVALUATION_CREATE_REQUEST:
      return { loading: true };
    case EVALUATION_CREATE_SUCCESS:
      return { loading: false, success: true };
    case EVALUATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const evaluatorListReducer = (state = { evaluators: [] }, action) => {
  switch (action.type) {
    case EVALUATION_EVALUATOR_LIST_REQUEST:
      return { loading: true };
    case EVALUATION_EVALUATOR_LIST_SUCCESS:
      return { loading: false, evaluators: action.payload };
    case EVALUATION_EVALUATOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EVALUATION_EVALUATOR_LIST_RESET:
      return { evaluators: [] };
    default:
      return state;
  }
};

export const evaluationListReducer = (state = { evaluations: [] }, action) => {
  switch (action.type) {
    case EVALUATION_LIST_REQUEST:
      return { loading: true };
    case EVALUATION_LIST_SUCCESS:
      return { loading: false, evaluations: action.payload };
    case EVALUATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EVALUATION_LIST_RESET:
      return { evaluations: [] };
    default:
      return state;
  }
};

export const evaluationUserListReducer = (
  state = { evaluations: [] },
  action
) => {
  switch (action.type) {
    case EVALUATION_USER_LIST_REQUEST:
      return { loading: true };
    case EVALUATION_USER_LIST_SUCCESS:
      return { loading: false, evaluations: action.payload };
    case EVALUATION_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EVALUATION_USER_LIST_RESET:
      return { evaluations: [] };
    default:
      return state;
  }
};

export const evaluationRatingsListReducer = (
  state = { ratings: [] },
  action
) => {
  switch (action.type) {
    case EVALUATION_RATINGS_REQUEST:
      return { loading: true };
    case EVALUATION_RATINGS_SUCCESS:
      return { loading: false, ratings: action.payload };
    case EVALUATION_RATINGS_FAIL:
      return { loading: false, error: action.payload };
    case EVALUATION_RATINGS_RESET:
      return { ratings: [] };
    default:
      return state;
  }
};
