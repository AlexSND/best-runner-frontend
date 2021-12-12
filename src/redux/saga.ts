import { put, takeLatest } from 'redux-saga/effects';
import { ITraining, ITrainingType } from '../types';
import {
  createTrainingError,
  createTrainingSuccess,
  deleteTrainingError,
  deleteTrainingSuccess,
  editTrainingSuccess,
  fetchTrainingsError,
  fetchTrainingsSuccess,
  fetchTrainingsTypesError,
  fetchTrainingsTypesSuccess
} from './actions';
import { ActionTypes } from './constants';


function* fetchTrainingsTypes() {
  const requestUrl = 'http://localhost:3000/types';
  try {
    const response: ITrainingType[] = yield fetch(requestUrl).then(res => res.json());
    if (response) {
      yield put(fetchTrainingsTypesSuccess(response));
    }
  } catch (error: any) {
    yield put(fetchTrainingsTypesError(error.message));
  }
}

function* fetchTrainings() {
  const requestUrl = 'http://localhost:3000/trainings';
  try {
    const response: ITraining[] = yield fetch(requestUrl).then(res => res.json());
    if (response) {
      yield put(fetchTrainingsSuccess(response));
    }
  } catch (error: any) {
    yield put(fetchTrainingsError(error.message));
  }
}

function* createTraining(training: ITraining) {
  const requestUrl = 'http://localhost:3000/trainings';
  try {
    const response: ITraining = yield fetch(requestUrl, {
      method: 'POST',
      body: JSON.stringify(training),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
    if (response) {
      yield put(createTrainingSuccess(response));
    }
  } catch (error: any) {
    yield put(createTrainingError(error.message));
  }
}

function* deleteTraining(id: string) {
  const requestUrl = `http://localhost:3000/trainings/${id}`;
  try {
    const response: ITraining = yield fetch(requestUrl, {
      method: 'DELETE',
      body: id,
    }).then(res => res.json());
    if (response) {
      yield put(deleteTrainingSuccess(id));
    }
  } catch (error: any) {
    yield put(deleteTrainingError(error.message));
  }
}

function* editTraining(training: ITraining) {
  console.log(training);
  const requestUrl = `http://localhost:3000/trainings/${training.id}`;
  try {
    const response: ITraining = yield fetch(requestUrl, {
      method: 'PUT',
      body: JSON.stringify(training),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
    if (response) {
      console.log(response);
      yield put(editTrainingSuccess(response));
    }
  } catch (error: any) {
    yield put(deleteTrainingError(error.message));
  }
}

export default function* appSaga() {
  yield takeLatest(ActionTypes.FETCH_TRAININGS_TYPES, fetchTrainingsTypes);
  yield takeLatest(ActionTypes.FETCH_TRAININGS, fetchTrainings);
  yield takeLatest(ActionTypes.CREATE_TRAINING, (action: any) => createTraining(action.payload));
  yield takeLatest(ActionTypes.DELETE_TRAINING, (action: any) => deleteTraining(action.payload));
  yield takeLatest(ActionTypes.EDIT_TRAINING, (action: any) => editTraining(action.payload));
}