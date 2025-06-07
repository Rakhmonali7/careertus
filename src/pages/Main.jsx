import { useState } from 'react';
import Jobs from '../components/Jobs';
import Events from '../components/Events';
import dot from '../assets/dot.svg';
import Nav from './Nav';
import Job from '../components/JobDetails';

function Main() {
  const [active, setActive] = useState('jobs');
  const handleMain = state => {
    setActive(state);
  };

  return (
    <>
      <Nav />
      <div className="px-4 sm:px-12 lg:px-20 xl:px-32">
        <div className="mt-4 sm:mt-6 p-4 sm:p-7 border rounded-2xl sm:rounded-3xl shadow-sm">
          <div className="flex justify-around flex-wrap gap-4 sm:gap-0">
            <h2
              onClick={() => handleMain('jobs')}
              className={`cursor-pointer flex items-center space-x-2 relative text-sm sm:text-lg font-medium ${
                active === 'jobs' ? 'text-black underline' : 'text-gray-400'
              }`}
            >
              {active === 'jobs' && (
                <img
                  src={dot}
                  alt="black dot"
                  className="absolute left-[-18px] sm:left-[-25px] w-3 h-3 sm:w-4 sm:h-4"
                />
              )}
              Jobs
            </h2>
            <h2
              onClick={() => handleMain('events')}
              className={`cursor-pointer flex items-center space-x-2 relative text-sm sm:text-lg font-medium ${
                active === 'events' ? 'text-black underline' : 'text-gray-400'
              }`}
            >
              {active === 'events' && (
                <img
                  src={dot}
                  alt="black dot"
                  className="absolute left-[-18px] sm:left-[-25px] w-3 h-3 sm:w-4 sm:h-4"
                />
              )}
              Events
            </h2>
          </div>

          <div className="mt-6">
            {active === 'jobs' && <Jobs />}
            {active === 'events' && <Events />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
