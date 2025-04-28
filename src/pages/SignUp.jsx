import { createClient } from "@supabase/supabase-js";
import Button from "../components/Button";
import Template from "../components/Template";
import { useState, useEffect } from "react";
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";

const supabase = createClient(
  "https://sqcjbblyhcobumfrfgik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2piYmx5aGNvYnVtZnJmZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTk5MjEsImV4cCI6MjA1NjczNTkyMX0.d3leK2Llh0_8aLAXudgZGpYN2ZTbxLLbdjizkP9zVqw"
);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  async function signUpNewUser() {
    if (password !== confirmPw) {
      setAlertMessage("Passwords do not match!");
      console.log("Passwords do not match!");
      return;
    }
    console.log({ email });
    if (email === "") {
      setAlertMessage("Please input email!");
      console.log("Please input email!");
      return;
    }
    if (password === "") {
      setAlertMessage("Please input password!");
      console.log("Please input password!");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: 'https://example.com/welcome',
      // },
    });
    if (!error) {
      const response = await api.post(endpoints.REGISTER_ROLE, { phone, name });
    }
    console.log({ data, error });
  }
  useEffect(() => {
    if (password !== confirmPw) {
      setAlertMessage("Passwords do not match!");
    } else {
      setAlertMessage("");
    }
  }, [confirmPw, password]);

  return (
    <Template
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPw={confirmPw}
      setConfirmPw={setConfirmPw}
      fCall={signUpNewUser}
    />
  );
}
export default SignUp;
