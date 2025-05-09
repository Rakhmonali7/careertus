import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Template from "../components/Template";
import Input from "../components/Input";
import { Button } from "antd";
import { setSignUpData } from "../store/reducers/globalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function SupabaseSignUp() {
  const [alertMessage, setAlertMessage] = useState("");

  const dispatch = useDispatch();
  const { email, password, confirmPw } = useSelector(
    (state) => state.globalState.signUpData
  );
  const { registerRole } = useSelector((state) => state.globalState);

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

  const supabaseSignUp = async (e) => {
    e.preventDefault();
    try {
      const errorMsg = validate();
      if (errorMsg) {
        setAlertMessage(errorMsg);
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `http://localhost:5173/register-role/${registerRole}`,
        },
      });
      console.log({ data });
      if (error) throw error;
    } catch (err) {
      console.log(err.message);
      setAlertMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <Template
      title={`Create account as ${registerRole}`}
      onSubmit={(e) => supabaseSignUp(e, templateStatusEnum.TWO)}
      footer={
        <Button htmlType="submit" size="large" color="default" variant="solid">
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
  );
}

export default SupabaseSignUp;
