import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "../actions/actionsTypes";

const initialState = {
  quiz: []
};

export default function createReducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: []
      }
    default:
      return state;
  }
}
