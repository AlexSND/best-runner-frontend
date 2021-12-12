import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ISortDirection, ITraining, ITrainingType } from '../../types';
import { deleteTraining, setDateSort, setDistanceSort } from '../../redux/actions';
import { formatDate } from '../../utils/format-date';
import { TableFieldTitle } from './style';

interface Props {
  trainings: ITraining[];
  loading: boolean;
  types: ITrainingType[];
  sortByDistance: ISortDirection;
  sortByDate: ISortDirection;
}

export const Table = ({ trainings, loading, types, sortByDistance, sortByDate }: Props) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const showDeleteDialog = (id: string) => {
    setSelectedId(id);
    setDeleteDialog(true);
  };

  const hideDeleteDialog = () => {
    setSelectedId(null);
    setDeleteDialog(false);
  };

  const handleRemove = () => {
    setDeleteDialog(false);
    if (selectedId) {
      dispatch(deleteTraining(selectedId));
    }
  };

  const typeBodyTemplate = (rowData: ITraining): string => {
    return types.find(type => type.id === rowData.typeId)?.name || '';
  };

  const actionBodyTemplate = (rowData: ITraining) => {
    return (
      <div className='p-flex'>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => showDeleteDialog(rowData.id!)}
        />
      </div>
    );
  };

  const dateBodyTemplate = ({ date }: ITraining) => {
    return formatDate(new Date(date));
  };

  const deleteDialogFooter = useMemo(() => (
    <>
      <Button label="Нет" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
      <Button label="Да" icon="pi pi-check" className="p-button-text" onClick={handleRemove} />
    </>
  ), [hideDeleteDialog, handleRemove]);

  const changeDistanceSort = () => {
    dispatch(setDateSort(null));
    sortByDistance !== 'asc'
      ? dispatch(setDistanceSort('asc'))
      : dispatch(setDistanceSort('desc'));
  };

  const changeDateSort = () => {
    dispatch(setDistanceSort(null));
    sortByDate !== 'asc'
      ? dispatch(setDateSort('asc'))
      : dispatch(setDateSort('desc'));
  };

  const dateHeaderTemplate = useMemo(() => {
    return <TableFieldTitle onClick={changeDateSort}>
      <span>Дата</span>
      { sortByDate === null && <span className='pi pi-fw pi-sort-alt'></span>}
      { sortByDate === 'asc' && <span className='pi pi-fw pi-sort-amount-up-alt'></span>}
      { sortByDate === 'desc' && <span className='pi pi-fw pi-sort-amount-down'></span>}
    </TableFieldTitle>;
  }, [sortByDate]);

  const distanceHeaderTemplate = useMemo(() => {
    return <TableFieldTitle onClick={changeDistanceSort}>
      <span>Дистанция</span>
      { sortByDistance === null && <span className='pi pi-fw pi-sort-alt'></span>}
      { sortByDistance === 'asc' && <span className='pi pi-fw pi-sort-amount-up-alt'></span>}
      { sortByDistance === 'desc' && <span className='pi pi-fw pi-sort-amount-down'></span>}
    </TableFieldTitle>;
  }, [sortByDistance]);

  return (
    <>
      <DataTable value={trainings} stripedRows className="p-datatable-customers" loading={loading}>
        <Column field="date" header={dateHeaderTemplate} body={dateBodyTemplate} />
        <Column field="typeId" header="Тип" body={typeBodyTemplate} />
        <Column field="distance" header={distanceHeaderTemplate} />
        <Column field="description" header="Описание" />
        <Column body={actionBodyTemplate} />
      </DataTable>

      <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Подтверждение" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
        { <span>Вы действительно хотите удалить тренировку?</span> }
      </Dialog>
    </>
  );
};