import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Register";
import Main from "./Main";
import Applicant from "./Applicant";
import AccauntSetting from "./AccauntSetting";

import ApplicantSignUp from "./ApplicantSignUp";
import SupabaseSignUp from "./SupabaseSignUp";

function Layout() {
  const location = useLocation(); // Get the current path

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/applicant" element={<Applicant />} />
        <Route path="/accauntSetting" element={<AccauntSetting />} />
        <Route path="/supabase-signup" element={<SupabaseSignUp />}></Route>
        <Route
          path="/register-role/applicant"
          element={<ApplicantSignUp />}
        ></Route>
      </Routes>
    </div>
  );
}

export default Layout;
