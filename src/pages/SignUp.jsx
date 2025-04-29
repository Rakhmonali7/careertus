import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Template from "../components/Template";
import Input from "../components/Input";
import { Button, ConfigProvider, Flex } from 'antd';
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("Anon Key:", import.meta.env.VITE_SUPABASE_ANON_KEY);
// Use environment variables in production!
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validate = () => {
    if (!email) return "Please input email!";
    if (!password) return "Please input password!";
    if (password !== confirmPw) return "Passwords do not match!";
    return null;
  };

  const signUpNewUser = async (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setAlertMessage(errorMsg);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      // Optional: example of API call
      // await api.post(endpoints.REGISTER_ROLE, { phone, name });

      setAlertMessage("Registration successful! Please check your email.");
    } catch (err) {
      setAlertMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <Template
      title="Create Account"
      onSubmit={signUpNewUser}
      footer={
        <Button htmlType="submit" size="large" color="default" variant="solid">
          Enter
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
  );
}

export default SignUp;
