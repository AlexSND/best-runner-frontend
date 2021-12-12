import { NavigateFunction } from 'react-router';
import { action } from 'typesafe-actions';
import { ITraining, ITrainingType } from '../types';
import { ActionTypes } from './constants';

// Fetch trainings types
export const fetchTrainingsTypes = () => action(
  ActionTypes.FETCH_TRAININGS_TYPES
);
export const fetchTrainingsTypesSuccess = (types: ITrainingType[]) => action(
  ActionTypes.FETCH_TRAININGS_TYPES_SUCCESS, types
);
export const fetchTrainingsTypesError = (error: any) => action(
  ActionTypes.FETCH_TRAININGS_TYPES_ERROR, error
);

// Fetch trainings
export const fetchTrainings = () => action(
  ActionTypes.FETCH_TRAININGS
);
export const fetchTrainingsSuccess = (trainings: ITraining[]) => action(
  ActionTypes.FETCH_TRAININGS_SUCCESS, trainings
);
export const fetchTrainingsError = (error: any) => action(
  ActionTypes.FETCH_TRAININGS_ERROR, error
);

// Fetch trainings
export const editTraining = (training: ITraining) => action(
  ActionTypes.EDIT_TRAINING, training
);
export const editTrainingSuccess = (training: ITraining) => action(
  ActionTypes.EDIT_TRAINING_SUCCESS, training
);
export const editTrainingError = (error: any) => action(
  ActionTypes.EDIT_TRAINING_ERROR, error
);

// Create training
export const createTraining = (params: {training: ITraining, navigate: NavigateFunction}) => action(
  ActionTypes.CREATE_TRAINING, params
);
export const createTrainingSuccess = (training: ITraining) => action(
  ActionTypes.CREATE_TRAINING_SUCCESS, training
);
export const createTrainingError = (error: any) => action(
  ActionTypes.CREATE_TRAINING_ERROR, error
);

// Delete training
export const deleteTraining = (id: string) => action(
  ActionTypes.DELETE_TRAINING, id
);
export const deleteTrainingSuccess = (id: string) => action(
  ActionTypes.DELETE_TRAINING_SUCCESS, id
);
export const deleteTrainingError = (error: any) => action(
  ActionTypes.DELETE_TRAINING_ERROR, error
);

// Update training
export const updateTraining = (params: {id: string, training: ITraining}) => action(
  ActionTypes.UPDATE_TRAINING, params
);
export const updateTrainingSuccess = (id: string) => action(
  ActionTypes.UPDATE_TRAINING_SUCCESS, id
);
export const updateTrainingError = (error: any) => action(
  ActionTypes.UPDATE_TRAINING_ERROR, error
);

// Set date sort
export const setDateSort = (direction: 'asc' | 'desc' | null) => action(
  ActionTypes.SET_DATE_SORT, direction
);

// Set distance sort
export const setDistanceSort = (direction: 'asc' | 'desc' | null) => action(
  ActionTypes.SET_DISTANCE_SORT, direction
);

// Set filtered types
export const setFilteredTypes = (types: ITrainingType[]) => action(
  ActionTypes.SET_FILTERED_TYPES, types
);

// Reset state
export const resetState = () => action(
  ActionTypes.RESET_STATE
);