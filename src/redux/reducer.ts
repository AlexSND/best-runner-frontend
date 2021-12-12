
import { ActionTypes } from './constants';
import { AppActions, AppState } from './types';

const initialState: AppState = {
  trainings: [],
  types: [],
  loading: false,
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
      types: action.payload,
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
      trainings: action.payload,
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
      trainings: [...state.trainings, action.payload],
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
      trainings: updatingTrainings,
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
      trainings: state.trainings.filter(training => training.id !== action.payload),
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