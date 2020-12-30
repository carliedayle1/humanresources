import {
  EVALUATION_CREATE_FAIL,
  EVALUATION_CREATE_REQUEST,
  EVALUATION_CREATE_SUCCESS,
  EVALUATION_EVALUATOR_LIST_FAIL,
  EVALUATION_EVALUATOR_LIST_REQUEST,
  EVALUATION_EVALUATOR_LIST_SUCCESS,
  EVALUATION_LIST_FAIL,
  EVALUATION_LIST_REQUEST,
  EVALUATION_LIST_SUCCESS,
  EVALUATION_RATINGS_ALL_FAIL,
  EVALUATION_RATINGS_ALL_REQUEST,
  EVALUATION_RATINGS_ALL_SUCCESS,
  EVALUATION_RATINGS_FAIL,
  EVALUATION_RATINGS_REQUEST,
  EVALUATION_RATINGS_SUCCESS,
  EVALUATION_RATING_CREATE_FAIL,
  EVALUATION_RATING_CREATE_REQUEST,
  EVALUATION_RATING_CREATE_SUCCESS,
  EVALUATION_RATING_LIST_FAIL,
  EVALUATION_RATING_LIST_REQUEST,
  EVALUATION_RATING_LIST_SUCCESS,
  EVALUATION_USER_LIST_FAIL,
  EVALUATION_USER_LIST_REQUEST,
  EVALUATION_USER_LIST_SUCCESS,
} from "../constants/evaluationConstants";
import axios from "axios";

export const createEvaluationRating = (userId, educ, acad, prof) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EVALUATION_RATING_CREATE_REQUEST,
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

    await axios.post(
      `/api/evaluation/rating`,
      { userId, educ, acad, prof },
      config
    );

    dispatch({
      type: EVALUATION_RATING_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_RATING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEvaluationRatingList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVALUATION_RATING_LIST_REQUEST,
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

    const { data } = await axios.get(
      `/api/evaluation/rating/${id}`,

      config
    );

    dispatch({
      type: EVALUATION_RATING_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_RATING_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createEvaluation = (id, total, qce, rank) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: EVALUATION_CREATE_REQUEST,
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

    await axios.post(`/api/evaluation/${id}`, { total, qce, rank }, config);

    dispatch({
      type: EVALUATION_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEvaluators = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVALUATION_EVALUATOR_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/evaluation/evaluators`, config);

    dispatch({
      type: EVALUATION_EVALUATOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_EVALUATOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEvaluations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVALUATION_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/evaluation`, config);

    dispatch({
      type: EVALUATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserEvaluations = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVALUATION_USER_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/evaluation/${id}`, config);

    dispatch({
      type: EVALUATION_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listEvaluationRatings = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVALUATION_RATINGS_REQUEST,
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

    const { data } = await axios.get(`/api/evaluation/rating`, config);

    dispatch({
      type: EVALUATION_RATINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_RATINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllEvaluationRatings = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EVALUATION_RATINGS_ALL_REQUEST,
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

    const { data } = await axios.get(
      `/api/evaluation/rating/all/${id}`,
      config
    );

    dispatch({
      type: EVALUATION_RATINGS_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVALUATION_RATINGS_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
