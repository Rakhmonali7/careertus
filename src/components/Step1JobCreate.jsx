import { useState } from 'react';
import CustomButton from '../components/Button';
import { useDispatch } from 'react-redux';
import { setJobData } from '../store/reducers/globalReducer';

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
  const dispatch = useDispatch();
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

      dispatch(setJobData({ key: 'job_type', value: updated.join(', ') }));
      return { ...prev, jobType: updated };
    });
  };

  const selectExperience = value => {
    setSelectedOptions(prev => ({
      ...prev,
      experience: [value], // allow only one
    }));
    dispatch(setJobData({ key: 'experience_lvl', value: value }));
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-semibold">Job Type</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3 my-3 sm:my-4">
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
        <h2 className="text-lg sm:text-xl font-semibold">Experience</h2>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
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
