import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Register";
import Main from "./Main";
import AccountSetting from "./AccountSetting";
import CompanyJobPost from "./CompanyJobPost";
import ApplicantSignUp from "./ApplicantSignUp";
import SupabaseSignUp from "./SupabaseSignUp";
import JobFinalEdit from "../components/JobFinalEdit";
import AdminPage from "./AdminPage";

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
        <Route path="/accountSetting" element={<AccountSetting />} />
        <Route path="/companyJobPost" element={<CompanyJobPost />} />
        <Route path="/jobFinalEdit" element={<JobFinalEdit />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default Layout;
