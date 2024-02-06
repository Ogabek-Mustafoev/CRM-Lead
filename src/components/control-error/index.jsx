import {get} from "lodash";

export const ControlError = ({form, field}) => {
  return (
    <>
      {get(form.touched, field.name) && get(form.errors, field.name) && (
        <div className='text-red-600'>
          {form.errors[field.name] && field.name && ('Вы должны заполнить это поле!')}
        </div>
      )}
    </>
  );
};
