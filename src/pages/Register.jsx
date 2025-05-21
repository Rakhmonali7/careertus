import { useState } from "react";
import logo from "../assets/reg-logo.svg";
import { createClient } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import {
  setAuthDataBulk,
  setIsLoggedIn,
  setUserRole,
} from "../store/reducers/globalReducer";
import { useNavigate } from "react-router-dom";
import api from "../configs/config";
import { endpoints } from "../configs/endpoints";
import { setAuthData } from "../store/reducers/globalReducer";
import { pages } from "../configs/pages";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Register() {
  const [emailInput, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tag, setTag] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUser = (user) => {
    dispatch(setUserRole(user));
    setTag(user);
  };

  async function signIn(event) {
    try {
      event.preventDefault();
      if (!tag) {
        alert("Please select the user type! (Applicant) or (Company)");
        return;
      }
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({
        email: emailInput,
        password,
      });
      const { access_token } = session;
      localStorage.setItem("token", access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      if (error) {
        alert(error.message);
        console.log(error.message);
        return;
      }
      const {
        data: {
          user: {
            user_id,
            birthdate,
            country,
            education,
            language,
            users: { account_id, email, name, phone, type },
          },
          code,
          message,
        },
      } = await api.post(endpoints.USER_SIGN_IN(tag));
      dispatch(
        setAuthDataBulk({
          user: "shared",
          data: {
            user_uuid: user_id,
            accountId: account_id,
            email,
            type,
            phone,
            name,
          },
        })
      );
      dispatch(
        setAuthDataBulk({
          user: tag,
          data: {
            nationality: country,
            location: country,
            birthdate,
            language,
            education,
            // gender,
          },
        })
      );
      // need to implement company sign-in case
      dispatch(setIsLoggedIn({ isLoggedIn: true })); // log the user in
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleNavigate = () => {
    if (!tag) {
      alert("Please select the user type! (Applicant) or (Company)");
      return;
    }
    navigate(pages.SUPABASE_REGISTER);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="w-full max-w-lg sm:max-w-md md:max-w-lg flex flex-col justify-center border rounded-2xl p-6 sm:p-8 md:p-18 bg-white shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            onClick={() => navigate("/")}
            alt="Company logo"
            src={logo}
            className="mx-auto h-10 w-auto cursor-pointer"
          />
        </div>

        <div className="flex justify-between mt-6 sm:mt-10 mb-6 sm:mb-8 border-b-2">
          <h2
            className={`text-lg sm:text-xl cursor-pointer pb-2 ${
              tag === "applicant"
                ? "before:content-['•'] before:mr-2 before:text-black"
                : "font-light"
            }`}
            onClick={() => handleUser("applicant")}
          >
            Applicant
          </h2>
          <h2
            className={`text-lg sm:text-xl cursor-pointer pb-2 ${
              tag === "company"
                ? "before:content-['•'] before:mr-2 before:text-black"
                : "font-light"
            }`}
            onClick={() => handleUser("company")}
          >
            Company
          </h2>
        </div>

        <div className="mt-2 w-full">
          <form action="#" method="POST" className="space-y-4 sm:space-y-6">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
              />
              <div className="flex justify-end mt-2">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => signIn(e)}
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#231815] px-4 py-2 text-white text-sm font-semibold shadow-md hover:bg-[#3D3D3D] focus:ring-2 focus:ring-offset-2 focus:ring-[#3D3D3D] cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{" "}
            <span
              onClick={handleNavigate}
              className="cursor-pointer font-semibold text-gray-600 hover:text-gray-800"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
