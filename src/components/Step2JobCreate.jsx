import { Select, Dropdown, Button, Space, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';

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

const items = [
  { label: 'USD $', key: '1' },
  { label: 'KRW ₩', key: '2' },
  { label: 'GBP £', key: '3' },
  { label: 'EUR €', key: '4' },
];

function Step2JobCreate() {
  const [selectedCurrency, setSelectedCurrency] = useState('Select currency');

  const handleCurrency = e => {
    const selected = items.find(item => item.key === e.key);

    if (selected) {
      setSelectedCurrency(selected.label);
    }
  };

  const menuCurrency = {
    items,
    onClick: handleCurrency,
  };

  return (
    <div>
      <div className="">
        <Dropdown menu={menuCurrency}>
          <Button>
            <Space>
              {selectedCurrency}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <InputNumber
          addonBefore={selectedCurrency}
          defaultValue={0}
          placeholder="Salary"
        />
        <InputNumber
          addonBefore={selectedCurrency}
          defaultValue={0}
          placeholder="Salary"
        />
        <Dropdown menu={menuCurrency}>
          <Button>
            <Space>
              {selectedCurrency}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
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
