import logo from '../assets/reg-logo.svg';
function SignUp() {
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        <div className="w-full max-w-lg sm:max-w-md md:max-w-lg flex flex-col justify-center border rounded-2xl p-6 sm:p-8 md:p-18 bg-white shadow-lg">
          <img src="{dot}" alt="dot" />
          <img src="{logo}" alt="logo" />
        </div>
      </div>
    </>
  );
}
export default SignUp;
