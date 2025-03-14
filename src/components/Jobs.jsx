import Button from '../components/Button';
import globeIcon from '../assets/globe.svg';
import dollarIcon from '../assets/dollar-sign.svg';
import dummyData from '../data/dummyData';

function Jobs() {
  return (
    <div className="p-8 space-y-6">
      {dummyData.map(job => (
        <div key={job.id} className="bg-[#EEEEEE] p-6 rounded-lg shadow-md">
          <span className="text-gray-600">{job.name}</span>
          <h2 className="text-2xl font-semibold">{job.position}</h2>

          {/* Location */}
          <div className="flex items-center gap-2 mt-2">
            <img src={globeIcon} alt="Location" className="w-4 h-4" />
            <span className="text-[14px] text-gray-700">{job.location}</span>
          </div>

          {/* Salary */}
          <div className="flex items-center gap-2 mt-1">
            <img src={dollarIcon} alt="Salary" className="w-4 h-4" />
            <span className="text-[14px] text-gray-700">
              {job.salary}.000 won/hour
            </span>
          </div>

          {/* Buttons & Date */}
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
