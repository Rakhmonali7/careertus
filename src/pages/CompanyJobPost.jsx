import Template from '../components/Template';
import CustomButton from '../components/Button';
import { Button, ConfigProvider } from 'antd';
const jobType = [
  'full-time',
  'part-time',
  'internship',
  'contract',
  'temporary',
  'volunteer',
  'permanent',
];
const experience = [
  'no-experience',
  'under 1 year',
  'entry-level',
  'mid-level',
  'senior-level',
  '1 year',
  '2 years',
  '3 years',
  '4+ years',
  'other',
];
function CompanyJobPost() {
  return (
    <div>
      <Template
        title="Add Job Details"
        theme="red"
        footer={
          <Button htmlType="submit" size="large" color="danger" variant="solid">
            Continue
          </Button>
        }
      >
        <div>
          <div className="mb-6">
            <h2>Job Type</h2>
            <div className="flex flex-wrap gap-2 my-4">
              {jobType.map(type => {
                return <CustomButton name={type} theme="red" />;
              })}
            </div>
          </div>
          <div>
            <h2>Experience</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {experience.map(exp => {
                return <CustomButton name={exp} theme="red" />;
              })}
            </div>
          </div>
        </div>
      </Template>
    </div>
  );
}
export default CompanyJobPost;
