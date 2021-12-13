import { put, takeLatest } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router';
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

const API_URL = 'http://localhost:3000';

function* fetchTrainingsTypes() {
  const requestUrl = `${API_URL}/types`;
  try {
    const response: ITrainingType[] = yield fetch(requestUrl).then(res => res.json());
    if (response) {
      yield put(fetchTrainingsTypesSuccess(response));
    }
  } catch (error: any) {
    yield put(fetchTrainingsTypesError('Ошибка сервера'));
  }
}

function* fetchTrainings() {
  const requestUrl = `${API_URL}/trainings`;
  try {
    const response: ITraining[] = yield fetch(requestUrl).then(res => res.json());
    if (response) {
      yield put(fetchTrainingsSuccess(response));
    }
  } catch (error: any) {
    yield put(fetchTrainingsError('Ошибка сервера'));
  }
}

function* createTraining({training, navigate}: {training: ITraining, navigate: NavigateFunction}) {
  const requestUrl = `${API_URL}/trainings`;
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
      navigate('/');
    }
  } catch (error: any) {
    yield put(createTrainingError('Ошибка сервера'));
  }
}

function* deleteTraining(id: string) {
  const requestUrl = `${API_URL}/trainings/${id}`;
  try {
    const response: ITraining = yield fetch(requestUrl, {
      method: 'DELETE',
      body: id,
    }).then(res => res.json());
    if (response) {
      yield put(deleteTrainingSuccess(id));
    }
  } catch (error: any) {
    yield put(deleteTrainingError('Ошибка сервера'));
  }
}

function* editTraining(training: ITraining) {
  const requestUrl = `${API_URL}/trainings/${training.id}`;
  try {
    const response: ITraining = yield fetch(requestUrl, {
      method: 'PUT',
      body: JSON.stringify(training),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
    if (response) {
      yield put(editTrainingSuccess(response));
    }
  } catch (error: any) {
    yield put(deleteTrainingError('Ошибка сервера'));
  }
}

export default function* appSaga() {
  yield takeLatest(ActionTypes.FETCH_TRAININGS_TYPES, fetchTrainingsTypes);
  yield takeLatest(ActionTypes.FETCH_TRAININGS, fetchTrainings);
  yield takeLatest(ActionTypes.CREATE_TRAINING, (action: any) => createTraining(action.payload));
  yield takeLatest(ActionTypes.DELETE_TRAINING, (action: any) => deleteTraining(action.payload));
  yield takeLatest(ActionTypes.EDIT_TRAINING, (action: any) => editTraining(action.payload));
}