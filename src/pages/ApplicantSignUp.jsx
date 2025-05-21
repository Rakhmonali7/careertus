import { useEffect, useState } from "react";
import Template from "../components/Template";
import Input from "../components/Input";
import { Button } from "antd";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
import {
  setTemplateStatus,
  setAuthData,
  resetAuthData,
  setAuthDataBulk,
} from "../store/reducers/globalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pages } from "../configs/pages";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");

  const templateStatus = useSelector(
    (state) => state.globalState.templateStatus
  );
  const { nationality, gender, location, birthdate, language, education } =
    useSelector((state) => state.globalState.applicant);
  const { phone, name, accountId } = useSelector(
    (state) => state.globalState.shared
  );
  const { shared, applicant, registerRole } = useSelector(
    (state) => state.globalState
  );

  const handleChange = (user, key) => (value) => {
    dispatch(setAuthData({ user, key, value }));
  };

  const handleForwardTemplate = (e, status) => {
    e.preventDefault();
    dispatch(setTemplateStatus(status));
  };

  const handleRegisterRole = async (e) => {
    e.preventDefault();
    try {
      for (let [key, value] of Object.entries(shared)) {
        if (["email", "password", "confirmPw", "type"].includes(key)) continue;
        if (!value) {
          setAlertMessage(`${key} is missing!`);
          return;
        }
      }
      for (let [key, value] of Object.entries(applicant)) {
        if (!value) {
          setAlertMessage(`${key} is missing!`);
          return;
        }
      }
      if (!registerRole) {
        setAlertMessage(`User role is missing!`);
        return;
      }

      const dataPayload = {
        type: "applicant",
        account_id: accountId,
        name,
        phone,
        birthdate,
        language,
        country: nationality,
        education,
      };
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : "";
      const {
        data: { user },
      } = await api.post(endpoints.REGISTER_ROLE, dataPayload);
      console.log({ user });
      let {
        account_id,
        email,
        name: _name,
        phone: _phone,
        type: _type,
        user_id,
      } = user;
      dispatch(
        setAuthDataBulk({
          user: "shared",
          data: {
            user_uuid: user_id,
            accountId: account_id,
            email,
            name: _name,
            phone: _phone,
            type: _type,
          },
        })
      );
      dispatch(setAuthDataBulk({ user: registerRole, data: user }));
      dispatch(setTemplateStatus(templateStatusEnum.ONE));
      navigate(pages.ACCOUNT_SETTING);
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
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <Input
          placeholder="Account Id"
          type="text"
          name="accountId"
          value={accountId || ""}
          onChange={handleChange("shared", "accountId")}
        />
      </Template>
    ),
    nameRegister: () => (
      <Template
        title="Enter your fullname"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.THREE)}
        footer={
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <Input
          placeholder="Full Name"
          type="text"
          name="name"
          value={name || ""}
          onChange={handleChange("shared", "name")}
        />
      </Template>
    ),
    phoneRegister: () => (
      <Template
        title="Enter your phone number"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.FOUR)}
        footer={
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <PhoneInput
          country={"kr"}
          value={phone || ""}
          onChange={(value) =>
            dispatch(setAuthData({ user: "shared", key: "phone", value }))
          }
          inputStyle={{ width: "100%" }}
          specialLabel=""
        />
      </Template>
    ),
    languageRegister: () => (
      <Template
        title="Enter your preferred language"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.FIVE)}
        footer={
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <Input
          placeholder="Language"
          type="text"
          name="language"
          value={language || ""}
          onChange={handleChange("applicant", "language")}
        />
      </Template>
    ),
    educationRegister: () => (
      <Template
        title="Enter your education"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.SIX)}
        footer={
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <Input
          placeholder="Education"
          type="text"
          name="education"
          value={education || ""}
          onChange={handleChange("applicant", "education")}
        />
      </Template>
    ),
    nationalityRegister: () => (
      <Template
        title="Enter your nationality"
        onSubmit={(e) => handleForwardTemplate(e, templateStatusEnum.SEVEN)}
        footer={
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <Input
          placeholder="Nationality"
          type="text"
          name="nationality"
          value={nationality || ""}
          onChange={handleChange("applicant", "nationality")}
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
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Select birthdate"
          value={birthdate ? dayjs(birthdate) : null}
          onChange={(date) =>
            handleChange(
              "applicant",
              "birthdate"
            )(date ? date.format("YYYY-MM-DD") : "")
          }
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
        <Select
          placeholder="Select your gender"
          value={gender || undefined}
          onChange={handleChange("applicant", "gender")}
          style={{ width: "100%" }}
        >
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Template>
    ),
    locationRegister: () => (
      <Template
        title="Enter your area of residence"
        onSubmit={handleRegisterRole}
        footer={
          <Button htmlType="submit" size="large">
            Continue
          </Button>
        }
      >
        {alertMessage && (
          <div className="text-red-500 text-sm">{alertMessage}</div>
        )}
        <Input
          placeholder="Area of residence"
          type="text"
          name="location"
          value={location || ""}
          onChange={handleChange("applicant", "location")}
        />
      </Template>
    ),
  };

  useEffect(() => {
    dispatch(setTemplateStatus(templateStatusEnum.ONE));
    dispatch(resetAuthData({ user: "shared" }));
    dispatch(resetAuthData({ user: registerRole }));
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
        return templates.accountIdRegister();
    }
  })();
}

export default ApplicantSignUp;
