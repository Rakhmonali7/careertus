import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Template from "../components/Template";
import Input from "../components/Input";
import { Button, ConfigProvider, Flex } from 'antd';
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
import {
  setUserRole,
  setTemplateStatus,
  setSignUpData,
  resetSignUpData,
} from "../store/reducers/globalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Use environment variables in production!
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const templateStatusEnum = {
  ONE: 0,
  TWO: 1,
  THREE: 2,
  FOUR: 3,
  FIVE: 4,
};

function SignUp() {
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const templateStatus = useSelector(
    (state) => state.globalState.templateStatus
  );
  const {
    email,
    password,
    confirmPw,
    nationality,
    gender,
    location,
    birthday,
  } = useSelector((state) => state.globalState.signUpData);

  // hof
  const handleChange = (key) => (value) => {
    dispatch(setSignUpData({ key, value }));
  };

  const validate = () => {
    if (!email) return "Please input email!";
    if (!password) return "Please input password!";
    if (password !== confirmPw) return "Passwords do not match!";
    return null;
  };

  const supabaseSignUp = async (e, status) => {
    e.preventDefault();
    try {
      const errorMsg = validate();
      if (errorMsg) {
        setAlertMessage(errorMsg);
        return;
      }
      // const { data, error } = await supabase.auth.signUp({ email, password });
      // console.log({ data });
      // if (error) throw error;
      console.log({ status });
      dispatch(setTemplateStatus(status));
    } catch (err) {
      console.log(err.message);
      setAlertMessage(err.message || "Something went wrong.");
    }
  };
  // await api.post(endpoints.REGISTER_ROLE, { phone, name });

  const handleForwardTemplate = (e, status) => {
    e.preventDefault();
    dispatch(setTemplateStatus(status));
  };

  const handleRegisterRole = async (e) => {
    e.preventDefault();
    try {
      // const response = await api.post(endpoints.REGISTER_ROLE, { phone });
      // navigate("/");
      console.log({
        email,
        password,
        confirmPw,
        nationality,
        gender,
        location,
        birthday,
      });
    } catch (err) {
      console.log(err.message);
      setAlertMessage(err.message || "Something went wrong.");
    }
  };

  const templates = {
    emailAndPwRegister: () => (
      <Template
        title="Create Account"
        onSubmit={(e) => supabaseSignUp(e, templateStatusEnum.TWO)}
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
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange("email")}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange("password")}
        />
        <Input
          placeholder="Confirm password"
          type="password"
          name="confirmPw"
          value={confirmPw}
          onChange={handleChange("confirmPw")}
        />
      </Template>
    ),
    nationalityRegister: () => (
      <Template
        title="Create Account"
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
        title="Create Account"
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
          placeholder="Birthday"
          type="text"
          name="birthday"
          value={birthday}
          onChange={handleChange("birthday")}
        />
      </Template>
    ),
    genderRegister: () => (
      <Template
        title="Create Account"
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
        title="Create Account"
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
        return templates.emailAndPwRegister();
      case templateStatusEnum.TWO:
        return templates.nationalityRegister();
      case templateStatusEnum.THREE:
        return templates.bdRegister();
      case templateStatusEnum.FOUR:
        return templates.genderRegister();
      case templateStatusEnum.FIVE:
        return templates.locationRegister();
      default:
        return templates.emailAndPwRegister();
    }
  })();
}

export default SignUp;
