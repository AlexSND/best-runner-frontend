import { ActionType } from 'typesafe-actions';
import { ISortDirection, ITrainingType } from '../types';
import * as actions from './actions';

export interface AppState {
  readonly trainings: ITraining[]
  readonly types: ITrainingType[]
  readonly loading: boolean
  readonly error: string | null
  readonly sortByDistance: ISortDirection;
  readonly sortByDate: ISortDirection;
}

export type AppActions = ActionType<typeof actions>
