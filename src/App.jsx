import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Layout from "./pages/Layout";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "./store/reducers/globalReducer";

const supabase = createClient(
  "https://sqcjbblyhcobumfrfgik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2piYmx5aGNvYnVtZnJmZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTk5MjEsImV4cCI6MjA1NjczNTkyMX0.d3leK2Llh0_8aLAXudgZGpYN2ZTbxLLbdjizkP9zVqw"
);

const App = () => {
  const dispatch = useDispatch();
  const [_, setSession] = useState(null);
  useEffect(() => {
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
