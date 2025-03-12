import { useState } from 'react';

function Main() {
  const [active, setActive] = useState('jobs');
  const handleMain = state => {
    setActive(state);
  };

  return (
    <>
      <div className="mt-6 p-7 border-1 rounded-3xl">
        <div className="flex justify-around">
          <h2
            onClick={() => {
              handleMain('jobs');
            }}
            className={`cursor-pointer flex items-center space-x-2 ${
              active === 'jobs' ? 'text-black' : 'text-gray-300'
            }`}
          >
            {active === 'jobs' && (
              <span className="before:content-['•'] text-black"></span>
            )}
            Jobs
          </h2>
          <h2
            onClick={() => {
              handleMain('events');
            }}
            className={`cursor-pointer flex items-center space-x-2 ${
              active === 'events' ? 'text-black' : 'text-gray-300'
            }`}
          >
            {active === 'events' && (
              <span className="before:content-['•'] text-black"></span>
            )}
            Events
          </h2>
        </div>
      </div>
    </>
  );
}

export default Main;
