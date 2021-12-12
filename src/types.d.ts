export interface ITraining {
  id?: string;
  typeId: string;
  distance: number;
  date: string;
  description: string;
}

export interface ITrainingType {
  id: string,
  name: string,
}

export type ISortDirection = 'asc' | 'desc' | null;