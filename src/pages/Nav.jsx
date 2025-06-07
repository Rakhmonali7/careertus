import { useNavigate } from 'react-router-dom';
import logo from '../assets/reg-logo.svg';
import profileIcon from '../assets/profile-icon.svg';
import search from '../assets/search-icon.svg';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { pages } from '../configs/pages';

function Nav() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.globalState.isLoggedIn);
  const { accountId } = useSelector(state => state.globalState.shared);
  const { registerRole } = useSelector(state => state.globalState);

  const handleLogin = () => {
    if (isAuthenticated) {
      if (registerRole === 'applicant') {
        navigate(pages.ACCOUNT_SETTING);
      } else {
        navigate(pages.JOB_FINAL_EDIT);
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="pt-6 sm:pt-12 px-4 sm:px-12">
      <div className="flex justify-between items-center">
        <div>
          <img alt="Company logo" src={logo} className="h-6 sm:h-7 w-auto" />
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {registerRole === 'company' && (
            <Button
              name="Post a job"
              onClick={() => navigate(pages.COMPANY_JOB_POST)}
            />
          )}
          <Button
            name={`${isAuthenticated ? accountId : 'Log in'}`}
            onClick={handleLogin}
          />
          <img
            className="h-5 sm:h-6 w-auto cursor-pointer"
            src={profileIcon}
            onClick={handleLogin}
            alt="profile-icon"
          />
        </div>
      </div>

      <div className="flex mt-4 sm:mt-6 relative">
        <img
          src={search}
          alt="search-icon"
          className="absolute h-5 sm:h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search Job Titles or Keywords"
          className="block bg-[#EEEEEE] rounded-full min-w-0 grow py-1.5 sm:py-2 pr-3 pl-12 placeholder:font-thin text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm sm:text-base"
        />
      </div>
    </div>
  );
}

export default Nav;
