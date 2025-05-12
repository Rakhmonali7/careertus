import { useNavigate } from "react-router-dom";
import logo from "../assets/reg-logo.svg";
import profileIcon from "../assets/profile-icon.svg";
import search from "../assets/search-icon.svg";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Nav() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.globalState.isLoggedIn);
  const { accountId } = useSelector((state) => state.globalState.shared);
  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/accountSetting");
    } else {
      navigate("/register");
    }
  };
  useEffect(() => {
    console.log({ isAuthenticated, accountId });
  });
  return (
    <div className="pt-12 px-50">
      <div className="flex justify-between">
        <div>
          <img alt="Company logo" src={logo} className="h-7 w-auto" />
        </div>
        <div>
          <div className="flex justify-between items-center gap-5">
            <Button
              name={`${isAuthenticated ? accountId : "Log in"}`}
              onClick={handleLogin}
            />
            <img
              className="h-6 w-auto cursor-pointer"
              src={profileIcon}
              onClick={handleLogin}
              alt="profile-icon"
            />
          </div>
        </div>
      </div>
      <div className="flex mt-6 relative">
        <img
          src={search}
          alt=""
          className="absolute h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search Job Titles or Keywords"
          className="block bg-[#EEEEEE] rounded-full min-w-0 grow py-1.5 pr-3 pl-15 placeholder:font-thin text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
        />
      </div>
    </div>
  );
}

export default Nav;
