import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import api from '../configs/config';
import { endpoints } from '../configs/endpoints';

const JobApplicationModal = ({ open, setOpen, func }) => {
  const [resumeUrl, setResumeUrl] = useState({ urlPath: '', fileName: '' });

  async function queryFreshResumeURL() {
    try {
      const { data } = await api.get(endpoints.RESUME_URL);
      console.log({ data });
      setResumeUrl({ urlPath: data?.url, fileName: data?.filename });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    queryFreshResumeURL();
  }, []);

  return (
    <Modal
      title={
        <div className="text-base sm:text-lg font-semibold">
          Apply to this position?
        </div>
      }
      centered
      open={open}
      onOk={() => func(() => setOpen(false))}
      onCancel={() => setOpen(false)}
      width="90%" // Мягкая ширина — идеально для мобилок
      className="max-w-[400px] sm:max-w-[600px]" // Контролируем максимальную ширину
      bodyStyle={{ padding: '16px' }}
    >
      <p className="flex flex-col text-sm sm:text-base text-gray-700">
        Current resume selected:{' '}
        <a
          href={resumeUrl?.urlPath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {resumeUrl.fileName || '-'}
        </a>
      </p>
    </Modal>
  );
};

export default JobApplicationModal;
