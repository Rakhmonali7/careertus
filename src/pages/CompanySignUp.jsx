import { useEffect, useState } from "react";
import Template from "../components/Template";
import Input from "../components/Input";
import { Button, ConfigProvider, Flex } from "antd";
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

const templateStatusEnum = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
  FIVE: 4,
  SIX: 5,
  SEVEN: 6,
};

function CompanySignUp() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const templateStatus = useSelector(
    (state) => state.globalState.templateStatus
  );
  const { phone, name, accountId } = useSelector(
    (state) => state.globalState.shared
  );
  const { company_name, industry, website, description } = useSelector(
    (state) => state.globalState.company
  );
  const { shared, company, registerRole } = useSelector(
    (state) => state.globalState
  );

  // hof
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
        if (
          key === "email" ||
          key === "password" ||
          key === "confirmPw" ||
          key === "type"
        )
          continue;
        if (value === "" || value === null) {
          setAlertMessage(`${key} is missing!`);
          return;
        }
      }
      for (let [key, value] of Object.entries(company)) {
        if (value === "" || value === null) {
          setAlertMessage(`${key} is missing!`);
          return;
        }
      }
      const dataPayload = {
        type: registerRole,
        account_id: accountId,
        name,
        phone,
        company_name,
        industry,
        website,
        description,
      };
      const token = localStorage.getItem("token");
      api.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : "";
      const {
        data: { user },
      } = await api.post(endpoints.REGISTER_ROLE, dataPayload);
      console.log({ data });
      let { account_id, email, name: _name, phone: _phone, type: _type } = user;
      dispatch(
        setAuthDataBulk({
          user: "shared",
          data: {
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
      navigate(pages.JOB_FINAL_EDIT);
    } catch (err) {
      console.log(err.message);
      setAlertMessage(err.message || "Something went wrong.");
    }
  };

  const templates = {
    accountIdRegister: () => (
      <Template
        title="Enter a new account id"
        theme="red"
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
          value={accountId || ""}
          onChange={handleChange("shared", "accountId")}
        />
      </Template>
    ),
    nameRegister: () => (
      <Template
        title="Enter your fullname"
        theme="red"
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
          value={name || ""}
          onChange={handleChange("shared", "name")}
        />
      </Template>
    ),
    phoneRegister: () => (
      <Template
        title="Enter your phone number"
        theme="red"
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
          value={phone || ""}
          onChange={handleChange("shared", "phone")}
        />
      </Template>
    ),
    companyNameRegister: () => (
      <Template
        title="Enter your company name"
        theme="red"
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
          placeholder="Company name"
          type="text"
          name="company_name"
          value={company_name || ""}
          onChange={handleChange(registerRole, "company_name")}
        />
      </Template>
    ),
    industryRegister: () => (
      <Template
        title="Enter your industry"
        theme="red"
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
          placeholder="Industry"
          type="text"
          name="industry"
          value={industry || ""}
          onChange={handleChange(registerRole, "industry")}
        />
      </Template>
    ),
    websiteRegister: () => (
      <Template
        title="Enter your website (optional)"
        theme="red"
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
          placeholder="Website link"
          type="text"
          name="website"
          value={website || ""}
          onChange={handleChange(registerRole, "website")}
        />
      </Template>
    ),
    descriptionRegister: () => (
      <Template
        theme="red"
        title="Enter your company's description"
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
          placeholder="Description"
          type="text"
          name="description"
          value={description || ""}
          onChange={handleChange(registerRole, "description")}
        />
      </Template>
    ),
  };

  useEffect(() => {
    dispatch(setTemplateStatus(templateStatusEnum.ONE));
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
        return templates.companyNameRegister();
      case templateStatusEnum.FIVE:
        return templates.industryRegister();
      case templateStatusEnum.SIX:
        return templates.websiteRegister();
      case templateStatusEnum.SEVEN:
        return templates.descriptionRegister();
      default:
        return templates.accountIdRegister();
    }
  })();
}

export default CompanySignUp;
