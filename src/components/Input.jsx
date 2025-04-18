import React from 'react';

const Input = ({ placeholder }) => {
  return (
    <>
      <div>
        <form action="#" method="POST" className="space-y-4 sm:space-y-6">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder={placeholder}
              required
              autoComplete="email"
              className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Input;
