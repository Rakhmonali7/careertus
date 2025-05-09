import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Register";
import Main from "./Main";
import AccountSetting from "./AccountSetting";
import CompanyJobPost from "./CompanyJobPost";
import ApplicantSignUp from "./ApplicantSignUp";
import SupabaseSignUp from "./SupabaseSignUp";

function Layout() {
  const location = useLocation(); // Get the current path

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/supabase-signup" element={<SupabaseSignUp />}></Route>
        <Route
          path="/register-role/applicant"
          element={<ApplicantSignUp />}
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/applicant" element={<Applicant />} />
        <Route path="/accountSetting" element={<AccountSetting />} />
        <Route path="/companyJobPost" element={<CompanyJobPost />} />
      </Routes>
    </div>
  );
}

export default Layout;
