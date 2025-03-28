import { useState } from 'react';
import Jobs from '../components/Jobs';
import Events from '../components/Events';
import dot from '../assets/dot.svg';
import Nav from './Nav';
function Main() {
  const [active, setActive] = useState('jobs');
  const handleMain = state => {
    setActive(state);
  };

  return (
    <>
      <Nav />
      <div className="px-50">
        <div className="mt-6 p-7 border-1 rounded-3xl">
          <div className="flex justify-around ">
            <h2
              onClick={() => {
                handleMain('jobs');
              }}
              className={`cursor-pointer flex items-center space-x-2 relative ${
                active === 'jobs' ? 'text-black underline' : 'text-gray-300'
              }`}
            >
              {active === 'jobs' && (
                <img
                  src={dot}
                  alt="black dot"
                  className="absolute left-[-25px]"
                />
              )}
              Jobs
            </h2>
            <h2
              onClick={() => {
                handleMain('events');
              }}
              className={`cursor-pointer flex items-center space-x-2 relative ${
                active === 'events' ? 'text-black underline' : 'text-gray-300'
              }`}
            >
              {active === 'events' && (
                <img
                  src={dot}
                  alt="black dot"
                  className="absolute left-[-25px]"
                />
              )}
              Events
            </h2>
          </div>

          {active === 'jobs' && <Jobs />}
          {active === 'events' && <Events />}
        </div>
      </div>
    </>
  );
}

export default Main;
