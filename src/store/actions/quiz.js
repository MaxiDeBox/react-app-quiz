import axios from '../../axios/axios-quiz';
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionsTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];

      Object.keys(response.data).forEach((key, idx) => {
        quizes.push({
          id: key,
          name: `Тест №${idx + 1}`
        });
      });

      dispatch(fetchQuizesSuccess(quizes))
    } catch (error) {
      console.log(error)
      dispatch(fetchQuizesError(error))
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: error
  }
}
