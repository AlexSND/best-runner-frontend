import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Preloader } from '../../components/Preloader/Preloader';
import { Table } from '../../components/Table/Table';
import { AppState } from '../../redux/types';
import { Container, ErrorMessage, PageWrapper } from '../../styles/shared-styles';
import { ITraining, ITrainingType } from '../../types';

export const MainPage = () => {
  const {
    error,
    filterByType,
    loading,
    sortByDate,
    sortByDistance,
    trainings,
  } = useSelector((state: AppState) => state);

  // Sorting and filtering
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

    return filterByType.length > 0
      ? sortedTrainings
        .filter((training: ITraining) => filterByType
          .some((type: ITrainingType) => type.id === training.typeId)
        )
      : sortedTrainings;

  }, [trainings, sortByDistance, sortByDate, filterByType]);

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
    <PageWrapper>
      <Container>
        <h1>Список тренировок:</h1>
        <Table
          trainings={sortedTrainings}
        />
      </Container>
    </PageWrapper>
  );
};