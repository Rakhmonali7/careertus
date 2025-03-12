import { useState } from 'react';
import logo from '../assets/reg-logo.svg';
function Register() {
  const [tag, setTag] = useState('applicant');
  const handleUser = user => {
    setTag(user);
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col justify-center p-[1rem] sm:p-[60px] md:p-[90px] lg:p-[110px] border-1 rounded-[29px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Company logo" src={logo} className="mx-auto h-10 w-auto" />
        </div>

        <div className="flex justify-between mt-10 mb-8 border-b-2">
          <h2
            className={`text-xl cursor-pointer pb-2 ${
              tag === 'applicant'
                ? "before:content-['•'] before:mr-2 before:text-black"
                : 'font-light'
            }`}
            onClick={() => {
              handleUser('applicant');
            }}
          >
            Applicant
          </h2>
          <h2
            className={`text-xl cursor-pointer pb-2 ${
              tag === 'company'
                ? "before:content-['•'] before:mr-2 before:text-black"
                : 'font-light'
            }`}
            onClick={() => {
              handleUser('company');
            }}
          >
            Company
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm ml-auto">
                  <a
                    href="#"
                    className="font-semibold text-[#bcbcbc] hover:text-[#3D3D3D]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#231815] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#3D3D3D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D3D3D]"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a
              href="#"
              className="font-semibold text-[#bcbcbc] hover:text-[#3D3D3D]"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
