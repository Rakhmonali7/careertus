import Template from '../components/Template';
import Step1JobCreate from '../components/Step1JobCreate';
import Step2JobCreate from '../components/Step2JobCreate';
import Step3JobCreate from '../components/Step3JobCreate';
import { Button } from 'antd';
import { useState } from 'react';

const stepComponents = [Step1JobCreate, Step2JobCreate, Step3JobCreate];

function CompanyJobPost() {
  const [step, setStep] = useState(0);
  const StepComponent = stepComponents[step];

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
            onClick={e => {
              e.preventDefault();
              setStep(prev => Math.min(prev + 1, stepComponents.length - 1));
            }}
            disabled={step >= stepComponents.length - 1}
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
