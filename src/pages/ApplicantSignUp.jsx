import { useEffect, useState } from "react";
import Template from "../components/Template";
import Input from "../components/Input";
import { Button, ConfigProvider, Flex } from 'antd';
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
import {
  setTemplateStatus,
  setSignUpData,
  resetSignUpData,
} from "../store/reducers/globalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const templateStatusEnum = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
  FIVE: 4,
  SIX: 5,
  SEVEN: 6,
  EIGHT: 7,
  NINE: 8,
};

function ApplicantSignUp() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const templateStatus = useSelector(
    (state) => state.globalState.templateStatus
  );
  const {
    nationality,
    gender,
    location,
    birthdate,
    phone,
    name,
    language,
    education,
    accountId,
  } = useSelector((state) => state.globalState.signUpData);
  const { signUpData, registerRole } = useSelector(
    (state) => state.globalState
  );

  // hof
  const handleChange = (key) => (value) => {
    dispatch(setSignUpData({ key, value }));
  };

  const handleForwardTemplate = (e, status) => {
    e.preventDefault();
    dispatch(setTemplateStatus(status));
  };

  const handleRegisterRole = async (e) => {
    e.preventDefault();
    try {
      for (let [key, value] of Object.entries(signUpData)) {
        if (value === "" || value === null) {
          setAlertMessage(`${key} is missing!`);
          return;
        }
      }
      const data = {
        type: registerRole,
        account_id: accountId,
        name,
        phone,
        birthdate,
        language,
        country: nationality,
        education,
      };
      const response = await api.post(endpoints.REGISTER_ROLE, data);
      console.log({ response });
      dispatch(resetSignUpData());
      dispatch(setTemplateStatus(templateStatusEnum.ONE));
      // navigate("/");
    } catch (err) {
      console.log(err.message);
      setAlertMessage(err.message || "Something went wrong.");
    }
  };

  const templates = {
    accountIdRegister: () => (
      <Template
        title="Enter a new account id"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.TWO)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Account Id"
          type="text"
          name="accountId"
          value={accountId}
          onChange={handleChange("accountId")}
        />
      </Template>
    ),
    nameRegister: () => (
      <Template
        title="Enter your fullname"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.THREE)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Full Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange("name")}
        />
      </Template>
    ),
    phoneRegister: () => (
      <Template
        title="Enter your phone number"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.FOUR)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Phone number"
          type="number"
          name="phone"
          value={phone}
          onChange={handleChange("phone")}
        />
      </Template>
    ),
    languageRegister: () => (
      <Template
        title="Enter your preferred language"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.FIVE)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="language"
          type="text"
          name="language"
          value={language}
          onChange={handleChange("language")}
        />
      </Template>
    ),
    educationRegister: () => (
      <Template
        title="Enter your education"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.SIX)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Education"
          type="text"
          name="education"
          value={education}
          onChange={handleChange("education")}
        />
      </Template>
    ),
    nationalityRegister: () => (
      <Template
        title="Enter your nationality"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.SEVEN)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Nationality"
          type="text"
          name="nationality"
          value={nationality}
          onChange={handleChange("nationality")}
        />
      </Template>
    ),
    bdRegister: () => (
      <Template
        title="Enter your birthdate"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.EIGHT)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Birthday"
          type="text"
          name="birthdate"
          value={birthdate}
          onChange={handleChange("birthdate")}
        />
      </Template>
    ),
    genderRegister: () => (
      <Template
        title="Select your gender"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.NINE)}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Gender"
          type="text"
          name="gender"
          value={gender}
          onChange={handleChange("gender")}
        />
      </Template>
    ),
    locationRegister: () => (
      <Template
        title="Enter your area of residence"
        onSubmit={handleRegisterRole}
        footer={
          <Button
            htmlType="submit"
            size="large"
            color="default"
            variant="solid"
          >
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm font-medium">{alertMessage}</div>
        )}
        <Input
          placeholder="Area of residence"
          type="text"
          name="location"
          value={location}
          onChange={handleChange("location")}
        />
      </Template>
    ),
  };

  useEffect(() => {
    dispatch(setTemplateStatus(templateStatusEnum.ONE));
    dispatch(resetSignUpData());
  }, []);

  return (() => {
    switch (templateStatus) {
      case templateStatusEnum.ONE:
        return templates.accountIdRegister();
      case templateStatusEnum.TWO:
        return templates.nameRegister();
      case templateStatusEnum.THREE:
        return templates.phoneRegister();
      case templateStatusEnum.FOUR:
        return templates.languageRegister();
      case templateStatusEnum.FIVE:
        return templates.educationRegister();
      case templateStatusEnum.SIX:
        return templates.nationalityRegister();
      case templateStatusEnum.SEVEN:
        return templates.bdRegister();
      case templateStatusEnum.EIGHT:
        return templates.genderRegister();
      case templateStatusEnum.NINE:
        return templates.locationRegister();
      default:
        return templates.emailAndPwRegister();
    }
  })();
}

export default ApplicantSignUp;
