
import { ActionTypes } from './constants';
import { AppActions, AppState } from './types';

const initialState: AppState = {
  trainings: [],
  types: [],
  loading: false,
  error: null,
  sortByDistance: null,
  sortByDate: null,
};
const appReducer = (state: AppState = initialState, action: AppActions): AppState => {
  switch (action.type) {
  case ActionTypes.FETCH_TRAININGS_TYPES:
    return {
      ...state,
      loading: true,
    };
  case ActionTypes.FETCH_TRAININGS_TYPES_SUCCESS:
    return {
      ...state,
      error: null,
      types: action.payload,
      loading: false,
    };
  case ActionTypes.FETCH_TRAININGS_TYPES_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };

  case ActionTypes.FETCH_TRAININGS:
    return {
      ...state,
      loading: true,
    };
  case ActionTypes.FETCH_TRAININGS_SUCCESS:
    return {
      ...state,
      error: null,
      trainings: action.payload,
      loading: false,
    };
  case ActionTypes.FETCH_TRAININGS_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };

  case ActionTypes.CREATE_TRAINING:
    return {
      ...state,
      loading: true,
    };
  case ActionTypes.CREATE_TRAINING_SUCCESS:
    return {
      ...state,
      error: null,
      trainings: [...state.trainings, action.payload],
      loading: false,
    };
  case ActionTypes.CREATE_TRAINING_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };

  case ActionTypes.EDIT_TRAINING:
    return {
      ...state,
      loading: true,
    };
  case ActionTypes.EDIT_TRAINING_SUCCESS:
    const idx = state.trainings.findIndex(training => training.id === action.payload.id);
    const updatingTrainings = [...state.trainings];
    updatingTrainings[idx] = action.payload;
    return {
      ...state,
      error: null,
      trainings: updatingTrainings,
      loading: false,
    };
  case ActionTypes.EDIT_TRAINING_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };

  case ActionTypes.DELETE_TRAINING:
    return {
      ...state,
      loading: true,
    };
  case ActionTypes.DELETE_TRAINING_SUCCESS:
    return {
      ...state,
      error: null,
      trainings: state.trainings.filter(training => training.id !== action.payload),
      loading: false,
    };
  case ActionTypes.DELETE_TRAINING_ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false,
    };

  case ActionTypes.SET_DATE_SORT:
    return {
      ...state,
      sortByDate: action.payload,
    };

  case ActionTypes.SET_DISTANCE_SORT:
    return {
      ...state,
      sortByDistance: action.payload,
    };

  case ActionTypes.RESET_STATE:
    return initialState;
  default:
    return state;
  }
};


export default appReducer;