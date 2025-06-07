import React from 'react';

const Input = ({
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  disabled = false,
}) => (
  <input
    id={name}
    name={name}
    type={type}
    placeholder={placeholder}
    required={required}
    disabled={disabled}
    value={value}
    onChange={e => onChange(e.target.value)}
    autoComplete={name}
    className={`block w-full rounded-md bg-white border border-gray-300 
      placeholder:text-gray-400 text-sm sm:text-base 
      px-3 py-2 sm:px-4 sm:py-2 
      text-gray-900 
      focus:border-indigo-600 focus:ring-indigo-600 
      disabled:bg-gray-100 disabled:cursor-not-allowed transition`}
  />
);

export default Input;
