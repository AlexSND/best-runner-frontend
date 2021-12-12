import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { createTraining, editTraining } from '../../redux/actions';
import { useFormik } from 'formik';
import { AppState } from '../../redux/types';
import { ITraining } from '../../types';
import { useNavigate } from 'react-router';

interface Props {
  id?: string | null;
  onSubmit?: () => void;
}

export const CreateForm = ({ id, onSubmit }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state: AppState) => state);

  const validate = (values: {
    [key: string]: any;
  }) => {
    const errors: {
      [key: string]: string;
    } = {};
    if (values.distance <= 0) {
      errors.distance = 'Должна быть больше 0';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      type: state.types[0],
      distance: 0,
      date: new Date(),
      description: '',
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: ({ type, distance, date, description }) => {
      const editedTraining = {
        typeId: type.id,
        distance,
        date: date.toISOString(),
        description,
      };

      if (id) {
        dispatch(editTraining({...editedTraining, id}));
        onSubmit && onSubmit();
      } else {
        dispatch(createTraining({
          training: editedTraining,
          navigate,
        }));
      }
    }
  });

  useEffect(() => {
    if (id) {
      const editedTraining = state.trainings.find((training: ITraining) => training.id === id);
      if (editedTraining) {
        console.log(editedTraining);
        formik.setValues({
          ...editedTraining,
          date: new Date(editedTraining.date),
          type: state.types.find(type => type.id === editedTraining.typeId) || state.types[0],
        });
      }
    }
  }, []);

  return (
    <form className="p-fluid" onSubmit={formik.handleSubmit}>
      <div className="p-grid">
        <div className="p-col-12 p-md-6">
          <div className="p-field">
            <label htmlFor="typeId">Тип тренировки</label>
            <Dropdown
              name="type"
              value={formik.values.type}
              options={state.types}
              onChange={formik.handleChange}
              placeholder="Тип тренировки"
              optionLabel="name"
            />
          </div>
          <div className="p-field">
            <label htmlFor="date">Дата</label>
            <Calendar
              id="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
          </div>
          <div className="p-field">
            <label htmlFor="distance" className={ `${formik.errors.distance ? 'p-error' : ''}` }>Дистанция</label>
            <InputNumber
              name="distance"
              value={formik.values.distance}
              onValueChange={formik.handleChange}
              mode="decimal"
              useGrouping={false}
              className={ `${formik.errors.distance ? 'p-invalid' : ''}` }
            />
            { formik.errors.distance ? <small className="p-error">{formik.errors.distance}</small> : null }
          </div>
        </div>
        <div className="p-col-12 p-md-6">
          <div className="p-field">
            <label htmlFor="description">Описание</label>
            <InputTextarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              autoResize
              rows={8}
            />
          </div>
        </div>
        <div className="p-col-12">
          <Button type='submit' label="Сохранить" icon="pi pi-save" style={{ width: 'auto' }} />
        </div>
      </div>
    </form>
  );
};