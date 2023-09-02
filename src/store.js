import { createStore } from 'redux';

const initialState = {
  email: '', 
  timer: 1 * 60,
  score: 0, 
  questions: [], 
  currentQuestionIndex: 0,
  visitedQuestions: Array(15).fill(false),
  attemptedQuestions: Array(15).fill(false),
  loading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestionIndex: action.payload };
    case 'SET_VISITED_QUESTIONS':
      return { ...state, visitedQuestions: action.payload };
    case 'SET_SCORE':
        return { ...state, score: action.payload };
    case 'SET_ATTEMPTED_QUESTION':
      const { index, value } = action.payload;
      return {
        ...state,
        attemptedQuestions: state.attemptedQuestions.map((item, i) => (i === index ? value : item)),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

export default store;
