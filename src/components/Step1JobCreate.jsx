import CustomButton from '../components/Button';

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

function Step1JobCreate() {
  return (
    <div>
      <div className="mb-6">
        <h2>Job Type</h2>
        <div className="flex flex-wrap gap-2 my-4">
          {jobType.map(type => (
            <CustomButton key={type} name={type} theme="red" />
          ))}
        </div>
      </div>
      <div>
        <h2>Experience</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {experience.map(exp => (
            <CustomButton key={exp} name={exp} theme="red" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step1JobCreate;
