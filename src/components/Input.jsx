import React from "react";

const Input = ({ placeholder, type, name, value, onChange }) => (
  <input
    id={name}
    name={name}
    type={type}
    placeholder={placeholder}
    required
    value={value}
    onChange={(e) => onChange(e.target.value)}
    autoComplete={name}
    className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
  />
);

export default Input;
