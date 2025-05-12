import globeIcon from '../assets/globe.svg';
import dollarIcon from '../assets/dollar-sign.svg';
import { Modal } from 'antd';
import Button from './Button';
import { useState } from 'react';

function JobDetails({ job, onBack }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="p-8 space-y-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline text-sm mb-4"
      >
        ← Back to Jobs
      </button>

      <div className="flex justify-between">
        <span className="text-gray-600">{job.name}</span>
        <span className="text-gray-500">{job.date}</span>
      </div>

      <h2 className="text-2xl font-bold">{job.position}</h2>

      <div className="flex gap-4 mt-3">
        <Button name="Part-time" />
        <Button name="Internship" />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <img src={globeIcon} alt="Location" className="w-4 h-4" />
        <span className="text-[14px] text-gray-700 font-semibold">
          {job.location}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <img src={dollarIcon} alt="Salary" className="w-4 h-4" />
        <span className="text-[14px] text-gray-700 font-semibold">
          {job.salary}.000 won/hour
        </span>
      </div>

      {job.description && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">{job.description.title}</h3>
          <p>{job.description.text}</p>
        </div>
      )}

      {job.requirements && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">{job.requirements.title}</h3>
          <p>{job.requirements.text}</p>
        </div>
      )}

      {job.offer && (
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">{job.offer.title}</h3>
          <p>{job.offer.text}</p>
        </div>
      )}

      {job.message && (
        <span className="block mt-4 text-sm text-gray-600">{job.message}</span>
      )}

      <button
        onClick={showModal}
        className="mt-6 px-4 py-2 bg-gray-950 text-white rounded hover:bg-gray-600 transition"
      >
        Apply
      </button>
      <Modal
        title="✅ Application Submitted Successfully"
        visible={isModalVisible}
        onOk={handleOk}
        okText="OK"
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>You will receive a confirmation email shortly.</p>
      </Modal>
    </div>
  );
}

export default JobDetails;
