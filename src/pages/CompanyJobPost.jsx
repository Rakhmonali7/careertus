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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pages } from "../configs/pages";
import { resetJobData } from "../store/reducers/globalReducer";
import Step5JobCreate from "../components/Step5JobCreate";

const stepComponents = [
  Step0JobCreate,
  Step1JobCreate,
  Step2JobCreate,
  Step3JobCreate,
  Step4JobCreate,
  Step5JobCreate,
];

function CompanyJobPost() {
  const [step, setStep] = useState(0);
  const { job, shared } = useSelector((state) => state.globalState);
  const { user_uuid } = useSelector((state) => state.globalState.shared);
  const StepComponent = stepComponents[step];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleContinue(e) {
    e.preventDefault();
    try {
      setStep((prev) => Math.min(prev + 1, stepComponents.length - 1));
      if (step >= stepComponents.length - 1) {
        const data = {
          ...job,
          company_id: user_uuid,
          contact_number: shared?.phone,
        };
        await api.post(endpoints.JOB_POST, data);
        dispatch(resetJobData());
        navigate(pages.MAIN);
      }
    } catch (err) {
      console.log("Unexpected error", err.message);
      alert(err.message);
    }
  }

  function handleGoBack(e) {
    e.preventDefault();
    setStep((prev) => Math.min(prev - 1, stepComponents.length - 1));
  }

  return (
    <div>
      <Template
        title="Add Job Details"
        theme="red"
        footer={
          <>
            <Button
              className={`${step === 0 && "invisible"}`}
              htmlType="submit"
              size="large"
              variant="solid"
              onClick={handleGoBack}
            >
              Go Back
            </Button>
            <Button
              htmlType="submit"
              size="large"
              color="danger"
              variant="solid"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </>
        }
      >
        <StepComponent key={step} />
      </Template>
    </div>
  );
}

export default CompanyJobPost;
