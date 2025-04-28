import logo from '../assets/reg-logo.svg';
import dot from '../assets/dot.svg';
import Input from '../components/Input';
import { Button, ConfigProvider, Flex } from 'antd';
function Template({ color }) {
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        <div className="w-full h-auto max-w-lg sm:max-w-md md:max-w-lg flex flex-col justify-between border rounded-2xl p-6 sm:p-8 md:p-18 bg-white shadow-lg md:min-h-[60vh]">
          <div>
            <div className="flex gap-4">
              <img src={dot} alt="dot" className="" />
              <img src={logo} alt="logo" className="max-w-[220px]" />
            </div>
            <h3 className="text-gray-300 font-medium text-xl mt-3">Sign up</h3>
          </div>

          <Input placeholder="Email" />
          <Button
            className="self-end"
            size="large"
            color="default"
            variant="solid"
          >
            Enter
          </Button>
        </div>
      </div>
    </>
  );
}
export default Template;
