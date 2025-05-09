import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const options = [
  { value: 'Resume is required', label: 'Resume is required' },
  {
    value:
      'Let potential candidates contact you about this job by email to the address provided',
    label:
      'Let potential candidates contact you about this job by email to the address provided',
  },
  {
    value: 'People with a criminal records are encouraged to apply',
    label: 'People with a criminal records are encouraged to apply',
  },
  {
    value: 'This job requires a background check',
    label: 'This job requires a background check',
  },
];

function Step2JobCreate() {
  return (
    <div>
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Choose preferences"
        options={options}
      />
    </div>
  );
}

export default Step2JobCreate;
