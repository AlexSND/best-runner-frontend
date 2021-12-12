import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { ITraining } from '../../types';
import { deleteTraining, setDateSort, setDistanceSort, setFilteredTypes } from '../../redux/actions';
import { ActionsField, TableFieldTitle } from './style';
import { CreateForm } from '../CreateForm/CreateForm';
import { formatDate } from '../../utils/format-date';
import { AppState } from '../../redux/types';

interface Props {
  trainings: ITraining[];
}

export const Table = ({ trainings }: Props) => {
  const dispatch = useDispatch();
  const { sortByDistance, sortByDate, filterByType, types } = useSelector((state: AppState) => state);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const showDeleteDialog = (id: string) => {
    setSelectedId(id);
    setDeleteDialog(true);
  };

  const hideDeleteDialog = () => {
    setSelectedId(null);
    setDeleteDialog(false);
  };

  const showEditDialog = (id: string) => {
    setSelectedId(id);
    setEditDialog(true);
  };

  const hideEditDialog = () => {
    setSelectedId(null);
    setEditDialog(false);
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
      <ActionsField>
        <Button
          type="button"
          icon="pi pi-pencil"
          className='p-mr-2 p-button-rounded p-button-text'
          onClick={() => showEditDialog(rowData.id!)}
        />
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          onClick={() => showDeleteDialog(rowData.id!)}
        />
      </ActionsField>
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

  const setTypeFilter = (e: any) => {
    dispatch(setFilteredTypes(e.value));
  };

  const tableHeaderTemplate = () => {
    return (
      <div className="p-d-flex p-jc-between">
        <MultiSelect value={filterByType} options={types} onChange={setTypeFilter} optionLabel="name" placeholder="Выберите тип" />
      </div>
    );
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
      <DataTable value={trainings} stripedRows className="p-datatable-customers" header={tableHeaderTemplate} emptyMessage="Ничего нет">
        <Column field="date" header={dateHeaderTemplate} body={dateBodyTemplate} />
        <Column field="typeId" header="Тип" body={typeBodyTemplate} />
        <Column field="distance" header={distanceHeaderTemplate} />
        <Column field="description" header="Описание" />
        <Column body={actionBodyTemplate} />
      </DataTable>

      <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Подтверждение" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
        { <span>Вы действительно хотите удалить тренировку?</span> }
      </Dialog>

      <Dialog visible={editDialog} style={{ width: '600px' }} header="Редактирование" modal onHide={hideEditDialog}>
        <CreateForm id={selectedId} onSubmit={hideEditDialog}/>
      </Dialog>
    </>
  );
};