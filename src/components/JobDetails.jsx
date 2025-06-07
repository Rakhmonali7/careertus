import globeIcon from '../assets/globe.svg';
import dollarIcon from '../assets/dollar-sign.svg';
import { Modal } from 'antd';
import Button from './Button';
import { useState } from 'react';
import JobApplicationModal from './JobApplicationModal';
import api from '../configs/config';
import { endpoints } from '../configs/endpoints';
import { useSelector } from 'react-redux';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  KRW: '₩',
  GBP: '£',
};

function JobDetails({ job, onBack }) {
  const [confirmModal, setConfirmModal] = useState(false);
  const [applicationModal, setApplicationModal] = useState(false);
  const { user_uuid } = useSelector(state => state.globalState.shared);

  const handleJobApply = async closeModal => {
    try {
      const jobData = {
        job_id: job?.id,
        applicant_id: user_uuid,
        message: 'Empty message!',
        heard_about_job: 'This is a test!',
        use_existing_resume: true,
      };
      const response = await api.post(endpoints.JOB_APPLY, jobData);
      console.log({ response });
      showConfirmModal();
      closeModal();
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  const showConfirmModal = () => {
    setConfirmModal(true);
  };

  const handleOk = () => {
    setConfirmModal(false);
  };

  return (
    <div className="p-4 sm:p-8 space-y-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="text-blue-600 cursor-pointer hover:underline text-sm sm:text-base mb-2 sm:mb-4"
      >
        ← Back to Jobs
      </button>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
        <span className="text-gray-600 text-sm sm:text-base">
          {job?.title || '-'}
        </span>
        <span className="text-gray-500 text-xs sm:text-sm">
          {job?.created_at || '-'}
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold">{job?.title || '-'}</h2>

      <div className="flex flex-wrap gap-2 sm:gap-4 mt-3">
        {job.job_type?.split(', ').map((el, i) => (
          <Button key={i} name={el} />
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <img
          src={globeIcon}
          alt="Location"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        />
        <span className="text-[12px] sm:text-[14px] text-gray-700 font-semibold">
          {job?.location || '-'}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-1 flex-wrap">
        <span className="text-gray-700 text-sm sm:text-base">
          {currencySymbols[job?.currency || 'USD']}
        </span>
        <span className="text-[12px] sm:text-[14px] text-gray-700 font-semibold">
          {job?.wage_min + ' ~ ' + job?.wage_max || '-'} {job?.currency || '-'}{' '}
          / {job?.rate || '-'}
        </span>
      </div>

      {job.description && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-sm sm:text-base">
            {job.description.title}
          </h3>
          <p className="text-sm sm:text-base">{job.description}</p>
        </div>
      )}

      {job.requirements && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-sm sm:text-base">
            {job.requirements.title}
          </h3>
          {/* <p>{job.requirements.text}</p> */}
        </div>
      )}

      {job.offer && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold text-sm sm:text-base">
            {job.offer.title}
          </h3>
          {/* <p>{job.offer.text}</p> */}
        </div>
      )}

      <button
        onClick={() => setApplicationModal(true)}
        className="mt-6 w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-gray-950 text-white rounded hover:bg-gray-600 transition text-sm sm:text-base"
      >
        Apply
      </button>

      <Modal
        title="✅ Application Submitted Successfully"
        open={confirmModal}
        onOk={handleOk}
        okText="OK"
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>You will receive a confirmation email shortly.</p>
      </Modal>

      <JobApplicationModal
        open={applicationModal}
        setOpen={setApplicationModal}
        func={handleJobApply}
      />
    </div>
  );
}

export default JobDetails;
