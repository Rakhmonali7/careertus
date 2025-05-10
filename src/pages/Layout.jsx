import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./Register";
import Main from "./Main";
import AccountSetting from "./AccountSetting";
import CompanyJobPost from "./CompanyJobPost";
import ApplicantSignUp from "./ApplicantSignUp";
import SupabaseSignUp from "./SupabaseSignUp";
import JobFinalEdit from "../components/JobFinalEdit";
import AdminPage from "./AdminPage";
import CompanySignUp from "./CompanySignUp";
import ProtectedRoute from "../components/ProtectedRoute";

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
          element={
            <ProtectedRoute>
              <ApplicantSignUp />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/register-role/company"
          element={
            <ProtectedRoute>
              <CompanySignUp />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/accountSetting"
          element={
            <ProtectedRoute>
              <AccountSetting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companyJobPost"
          element={
            <ProtectedRoute>
              <CompanyJobPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobFinalEdit"
          element={
            <ProtectedRoute>
              <JobFinalEdit />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default Layout;
