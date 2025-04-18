import { useState } from 'react';
import globeIcon from '../assets/globe.svg';
import dollarIcon from '../assets/dollar-sign.svg';
import dummyData from '../data/dummyData';
import Button from '../components/Button';
import JobDetails from './JobDetails';

function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="p-8 space-y-6">
      {dummyData.map(job => (
        <div
          key={job.id}
          className="bg-[#f6f5f5] p-6 rounded-lg shadow-md cursor-pointer hover:bg-[#EEEEEE] transition"
          onClick={() => setSelectedJob(job)}
        >
          <span className="text-gray-600">{job.name}</span>
          <h2 className="text-2xl font-semibold">{job.position}</h2>

          <div className="flex items-center gap-2 mt-2">
            <img src={globeIcon} alt="Location" className="w-4 h-4" />
            <span className="text-[14px] text-gray-700">{job.location}</span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <img src={dollarIcon} alt="Salary" className="w-4 h-4" />
            <span className="text-[14px] text-gray-700">
              {job.salary}.000 won/hour
            </span>
          </div>

          <div className="flex mt-3 justify-between">
            <div className="flex gap-4">
              <Button name="Part-time" />
              <Button name="Internship" />
            </div>
            <div>
              <span className="text-[14px] text-gray-600">
                Job Posted: {job.date}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
