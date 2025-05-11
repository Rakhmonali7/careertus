import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Card, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
import { useSelector } from "react-redux";

const fieldLabels = {
  id: "User ID",
  name: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  birthdate: "Birthday",
  gender: "Gender",
  language: "Preferred Language",
  country: "Country",
};

function AccountSetting() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { registerRole, shared, applicant } = useSelector(
    (state) => state.globalState
  );
  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    gender: "",
    language: "",
    country: "",
  });

  const queryAndSetAccountSettings = async () => {
    try {
      const {
        data: { user },
      } = await api.get(endpoints.USER_INFO(registerRole));
      let { account_id, name, email, phone, birthdate, language, country } =
        user;
      form.setFieldsValue({
        id: account_id,
        name,
        email,
        phone,
        birthdate,
        gender: "male",
        language,
        country,
      });
      setInitialValues((prev) => ({
        ...prev,
        id: account_id,
        name,
        email,
        phone,
        birthdate,
        gender: "male",
        language,
        country,
      }));
    } catch (err) {
      console.log("Account settings query error:", err.message);
    }
  };

  const [editingFields, setEditingFields] = useState(
    Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    )
  );

  const toggleEdit = (field) => {
    setEditingFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Profile updated successfully!");
      console.log("Updated values:", values);
    } catch (error) {
      message.error("Failed to update profile.");
    }
    setLoading(false);
    setEditingFields((prev) =>
      Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );
  };

  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    const isLt15M = file.size / 1024 / 1024 < 15;

    if (!isPDF) {
      message.error("Only PDF files are allowed!");
    }

    if (!isLt15M) {
      message.error("File must be smaller than 15MB!");
    }

    return isPDF && isLt15M;
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // only keep the latest file
  };

  useEffect(() => {
    queryAndSetAccountSettings();
  }, []);
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
            {Object.keys(initialValues).map((field) => (
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
                    <Input disabled={field === "id" || !editingFields[field]} />
                  </Form.Item>
                  {field !== "id" && (
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
