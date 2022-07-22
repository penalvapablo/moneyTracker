import React from 'react'
import { useField } from 'formik';


export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input max-w-lg mt-5 rounded-lg px-1 py-0.5" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-700 font-semibold mt-2">{meta.error}</div>
      ) : null}
    </>
  );
};