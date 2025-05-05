import Template from "../components/Template";
import Input from "../components/Input";
import { Button } from 'antd';

function Applicant() {
  return (
    <Template
      title="User Sign Up"
      footer={
        <Button htmlType="submit" size="large" type="default">
          Continue
        </Button>
      }
    >
      <Input
        placeholder="Enter Your full name: (John Doe)"
        type="text"
        name="name"
      />
      <Input
        placeholder="Enter Your full name: (John Doe)"
        type="text"
        name="name"
      />
    </Template>
  );
}

export default Applicant;
