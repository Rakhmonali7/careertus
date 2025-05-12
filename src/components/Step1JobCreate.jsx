import { useState } from 'react';
import CustomButton from '../components/Button';

const jobTypeOptions = [
  'full-time',
  'part-time',
  'internship',
  'contract',
  'temporary',
  'volunteer',
  'permanent',
];

const experienceOptions = [
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
  const [selectedOptions, setSelectedOptions] = useState({
    jobType: [],
    experience: [],
  });

  const toggleJobType = value => {
    setSelectedOptions(prev => {
      const isSelected = prev.jobType.includes(value);
      const updated = isSelected
        ? prev.jobType.filter(item => item !== value)
        : [...prev.jobType, value];
      return { ...prev, jobType: updated };
    });
  };

  const selectExperience = value => {
    setSelectedOptions(prev => ({
      ...prev,
      experience: [value], // allow only one
    }));
  };

  console.log('Selected Options:', selectedOptions);

  return (
    <div>
      <div className="mb-6">
        <h2>Job Type</h2>
        <div className="flex flex-wrap gap-2 my-4">
          {jobTypeOptions.map(type => (
            <CustomButton
              key={type}
              name={type}
              theme={selectedOptions.jobType.includes(type) ? 'red' : 'gray'}
              onClick={e => {
                e.preventDefault();
                toggleJobType(type);
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <h2>Experience</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          {experienceOptions.map(exp => (
            <CustomButton
              key={exp}
              name={exp}
              theme={selectedOptions.experience.includes(exp) ? 'red' : 'gray'}
              onClick={e => {
                e.preventDefault();
                selectExperience(exp);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Step1JobCreate;
