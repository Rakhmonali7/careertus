import { useEffect, useState } from 'react';
import globeIcon from '../assets/globe.svg';
import Button from '../components/Button';
import JobDetails from './JobDetails';
import api from '../configs/config';
import { endpoints } from '../configs/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { setFetchedJobs } from '../store/reducers/globalReducer';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  KRW: '₩',
  GBP: '£',
};

function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();
  const { jobs = [] } = useSelector(state => state.globalState);

  async function queryJobs() {
    try {
      const {
        data: { jobs },
      } = await api.get(endpoints.JOBS);
      console.log({ jobs });
      dispatch(setFetchedJobs(jobs));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    queryJobs();
  }, []);

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
      {jobs.map(job => (
        <div
          key={job.id}
          className="bg-[#f6f5f5] p-4 sm:p-6 rounded-lg shadow-md cursor-pointer hover:bg-[#EEEEEE] transition"
          onClick={() => setSelectedJob(job)}
        >
          <span className="text-gray-600 text-sm sm:text-base">
            {job.title || '-'}
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold">
            {job.title || '-'}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <img
              src={globeIcon}
              alt="Location"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            />
            <span className="text-xs sm:text-sm text-gray-700">
              {job.location || '-'}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-gray-700 text-sm sm:text-base">
              {currencySymbols[job?.currency || 'USD']}
            </span>
            <span className="text-xs sm:text-sm text-gray-700">
              {job?.wage_min + ' ~ ' + job?.wage_max || '-'}{' '}
              {job.currency || '-'} / {job.rate || '-'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row mt-3 justify-between gap-3 sm:gap-0">
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {job.job_type?.split(', ').map((el, i) => (
                <Button key={i} name={el} />
              ))}
            </div>
            <div>
              <span className="text-xs sm:text-sm text-gray-600">
                Job Posted:{' '}
                {moment(job?.created_at).format('YYYY.MM.DD hh:mm A')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Jobs;
