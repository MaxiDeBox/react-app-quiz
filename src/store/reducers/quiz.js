import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionsTypes";

const initionalState = {
  quizes: [],
  loading: false,
  error: null
};

export default function quizReducer(state = initionalState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return { ...state, loading: true }
    case FETCH_QUIZES_SUCCESS:
      return { ...state, loading: false, quizes: action.quizes }
    case FETCH_QUIZES_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
