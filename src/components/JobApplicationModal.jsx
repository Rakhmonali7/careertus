import React, { useEffect, useState } from "react";
import { Flex, Modal } from "antd";
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";

const JobApplicationModal = ({ open, setOpen, func }) => {
  const [resumeUrl, setResumeUrl] = useState({ urlPath: "", fileName: "" });
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
    <Flex vertical gap="middle" align="flex-start">
      <Modal
        title="Apply to this position?"
        centered
        open={open}
        onOk={() => func(() => setOpen(false))}
        onCancel={() => setOpen(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <p className="flex flex-col">
          Current resume selected:{" "}
          <a
            href={resumeUrl?.urlPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            {resumeUrl.fileName}
          </a>
        </p>
      </Modal>
    </Flex>
  );
};
export default JobApplicationModal;
