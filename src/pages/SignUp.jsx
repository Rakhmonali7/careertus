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
} from "../store/reducers/globalReducer";
import { useDispatch, useSelector } from "react-redux";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const templateStatus = useSelector(
    (state) => state.globalState.templateStatus
  );

  const validate = () => {
    if (!email) return "Please input email!";
    if (!password) return "Please input password!";
    if (password !== confirmPw) return "Passwords do not match!";
    return null;
  };

  const signUpNewUser = async (e) => {
    e.preventDefault();
    try {
      const errorMsg = validate();
      if (errorMsg) {
        setAlertMessage(errorMsg);
        return;
      }
      // const { data, error } = await supabase.auth.signUp({ email, password });
      // if (error) throw error;
      dispatch(setTemplateStatus(templateStatusEnum.TWO));

      // Optional: example of API call
      // await api.post(endpoints.REGISTER_ROLE, { phone, name });

      setAlertMessage("Registration successful! Please check your email.");
    } catch (err) {
      setAlertMessage(err.message || "Something went wrong.");
    }
  };

  const templates = {
    emailAndPwRegister: () => (
      <Template
        title="Create Account"
        onSubmit={signUpNewUser}
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
          onChange={setEmail}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        <Input
          placeholder="Confirm password"
          type="password"
          name="confirmPw"
          value={confirmPw}
          onChange={setConfirmPw}
        />
      </Template>
    ),
    nationalityRegister: () => (
      <Template
        title="Create Account"
        onSubmit={signUpNewUser}
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
          value={email}
          onChange={setEmail}
        />
      </Template>
    ),
    bdRegister: () => (
      <Template
        title="Create Account"
        onSubmit={signUpNewUser}
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
          value={email}
          onChange={setEmail}
        />
      </Template>
    ),
    genderRegister: () => (
      <Template
        title="Create Account"
        onSubmit={signUpNewUser}
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
          value={email}
          onChange={setEmail}
        />
      </Template>
    ),
    locationRegister: () => (
      <Template
        title="Create Account"
        onSubmit={signUpNewUser}
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
          value={email}
          onChange={setEmail}
        />
      </Template>
    ),
  };

  useEffect(() => {
    dispatch(setTemplateStatus(templateStatusEnum.ONE));
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
