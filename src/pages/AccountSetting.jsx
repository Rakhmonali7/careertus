import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Upload } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';

const fieldLabels = {
  id: 'User ID',
  name: 'Full Name',
  email: 'Email Address',
  phone: 'Phone Number',
  birthDay: 'Birthday',
  gender: 'Gender',
  language: 'Preferred Language',
  country: 'Country',
};

function AccountSetting() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const initialValues = {
    id: 'user123',
    name: 'John Doe',
    email: 'user@example.com',
    phone: '+82-10-1234-5678',
    birthDay: '1990-01-01',
    gender: 'male',
    language: 'English',
    country: 'South Korea',
  };

  const [editingFields, setEditingFields] = useState(
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    )
  );

  const toggleEdit = field => {
    setEditingFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onFinish = async values => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Profile updated successfully!');
      console.log('Updated values:', values);
    } catch (error) {
      message.error('Failed to update profile.');
    }
    setLoading(false);
    setEditingFields(prev =>
      Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );
  };

  const beforeUpload = file => {
    const isPDF = file.type === 'application/pdf';
    const isLt15M = file.size / 1024 / 1024 < 15;

    if (!isPDF) {
      message.error('Only PDF files are allowed!');
    }

    if (!isLt15M) {
      message.error('File must be smaller than 15MB!');
    }

    return isPDF && isLt15M;
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // only keep the latest file
  };

  return (
    <div className="w-screen h-screen overflow-auto">
      <div className="px-[20%] py-[5%]">
        <Card
          className="bg-[#f6f5f5] rounded-lg shadow-md"
          title="Account Settings"
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onFinish}
          >
            {Object.keys(initialValues).map(field => (
              <div className="flex items-center gap-4 mb-4" key={field}>
                <label className="w-40 font-medium text-gray-700">
                  {fieldLabels[field] || field}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex-1 flex items-center gap-2">
                  <Form.Item
                    name={field}
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: `Please enter ${fieldLabels[field] || field}`,
                      },
                    ]}
                  >
                    <Input disabled={field === 'id' || !editingFields[field]} />
                  </Form.Item>
                  {field !== 'id' && (
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => toggleEdit(field)}
                    />
                  )}
                </div>
              </div>
            ))}

            <div
              className="mb-6 
            "
            >
              <label className="block font-medium text-gray-700 mb-2">
                Resume Upload (PDF only, max 15MB)
              </label>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={beforeUpload}
                showUploadList={{ showPreviewIcon: false }}
                accept=".pdf"
              >
                <Button icon={<UploadOutlined />}>Upload Resume</Button>
              </Upload>
            </div>

            <div className="flex justify-end">
              <Form.Item className="mb-0">
                <Button
                  color="default"
                  variant="solid"
                  htmlType="submit"
                  loading={loading}
                >
                  Save Changes
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default AccountSetting;
