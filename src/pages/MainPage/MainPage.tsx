import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '../../components/Preloader/Preloader';
import { Table } from '../../components/Table/Table';
import { AppState } from '../../redux/types';
import { Container, ErrorMessage } from '../../styles/shared-styles';
import { ITraining } from '../../types';

export const MainPage = () => {
  const {
    loading,
    trainings,
    types,
    sortByDistance,
    sortByDate,
    error
  } = useSelector((state: AppState) => state);

  // Sort trainings by distance
  const sortedTrainings: ITraining[] = useMemo(() => {
    let sortedTrainings = trainings;

    if (sortByDistance === 'asc') {
      sortedTrainings = [...trainings].sort((a, b) => a.distance - b.distance);
    } else if (sortByDistance === 'desc') {
      sortedTrainings = [...trainings].sort((a, b) => b.distance - a.distance);
    }

    if (sortByDate === 'asc') {
      sortedTrainings = [...trainings].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    } else if (sortByDate === 'desc') {
      sortedTrainings = [...trainings].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }

    return sortedTrainings;

  }, [trainings, sortByDistance, sortByDate]);

  if (error) {
    return (
      <Container>
        <ErrorMessage>
          { error }
        </ErrorMessage>
      </Container>
    );
  }

  if (loading) {
    return (
      <Preloader/>
    );
  }

  return (
    <Container>
      <h1>Список тренировок:</h1>
      <Table
        trainings={sortedTrainings}
        loading={loading}
        types={types}
        sortByDistance={sortByDistance}
        sortByDate={sortByDate}
      />
    </Container>
  );
};