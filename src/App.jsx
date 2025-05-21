import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Layout from "./pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setAuthDataBulk, setIsLoggedIn } from "./store/reducers/globalReducer";
import api from "./configs/config";
import { endpoints } from "./configs/endpoints";

const supabase = createClient(
  "https://sqcjbblyhcobumfrfgik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2piYmx5aGNvYnVtZnJmZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTk5MjEsImV4cCI6MjA1NjczNTkyMX0.d3leK2Llh0_8aLAXudgZGpYN2ZTbxLLbdjizkP9zVqw"
);

const App = () => {
  const dispatch = useDispatch();
  const [_, setSession] = useState(null);
  const { registerRole } = useSelector((state) => state.globalState);
  const queryAndSetUserInfo = async () => {
    try {
      const {
        data: { user },
      } = await api.get(endpoints.USER_INFO(registerRole));
      let { account_id, email, name, phone, type, user_id } = user;
      dispatch(
        setAuthDataBulk({
          user: "shared",
          data: {
            accountId: account_id,
            email,
            name,
            phone,
            type,
            user_uuid: user_id,
          },
        })
      );
      dispatch(setAuthDataBulk({ user: registerRole, data: user }));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    queryAndSetUserInfo();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        const { access_token } = session;
        localStorage.setItem("token", access_token);
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        const { access_token } = session;
        localStorage.setItem("token", access_token);
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
