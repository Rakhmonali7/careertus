import Template from "../components/Template";
import Step1JobCreate from "../components/Step1JobCreate";
import Step2JobCreate from "../components/Step2JobCreate";
import Step3JobCreate from "../components/Step3JobCreate";
import Step4JobCreate from "../components/Step4JobCreate";

import { Button } from "antd";
import { useState } from "react";
import Step0JobCreate from "../components/Step0JobCreate";
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
import { useSelector } from "react-redux";

const stepComponents = [
  Step0JobCreate,
  Step1JobCreate,
  Step2JobCreate,
  Step3JobCreate,
  Step4JobCreate,
];

function CompanyJobPost() {
  const [step, setStep] = useState(0);
  const { job } = useSelector((state) => state.globalState);
  const { user_uuid } = useSelector((state) => state.globalState.shared);
  const StepComponent = stepComponents[step];

  async function handleContinue(e) {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, stepComponents.length - 1));
    if (step >= stepComponents.length - 1) {
      const data = { ...job, company_id: user_uuid };
      // need to include user_uuid field in the global store
      const response = await api.post(endpoints.JOB_POST);
      console.log({ response });
    }
  }

  return (
    <div>
      <Template
        title="Add Job Details"
        theme="red"
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="danger"
            variant="solid"
            onClick={handleContinue}
          >
            Continue
          </Button>
        }
      >
        <StepComponent key={step} />
      </Template>
    </div>
  );
}

export default CompanyJobPost;
