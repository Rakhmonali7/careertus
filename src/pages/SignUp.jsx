import logo from '../assets/reg-logo.svg';
import dot from '../assets/dot.svg';
import Input from '../components/Input';
import { createClient } from '@supabase/supabase-js';
import Button from '../components/Button';

const supabase = createClient(
  'https://sqcjbblyhcobumfrfgik.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2piYmx5aGNvYnVtZnJmZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTk5MjEsImV4cCI6MjA1NjczNTkyMX0.d3leK2Llh0_8aLAXudgZGpYN2ZTbxLLbdjizkP9zVqw'
);

function SignUp() {
  // const { email, setEmail } = setState('');
  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'andrewtate@gmail.com',
      password: '123456789s',
      // options: {
      //   emailRedirectTo: 'https://example.com/welcome',
      // },
    });
    console.log({ data, error });
  }
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        <div className="w-full max-w-lg sm:max-w-md md:max-w-lg flex flex-col justify-center border rounded-2xl p-2 sm:p-4 md:p-10 bg-white shadow-lg">
          <div className="flex items-center gap-5">
            <img src={dot} alt="dot" className="w-4" />
            <img src={logo} alt="logo" className="h-6" />
          </div>
          <span className="block text-[#bcbcbc] mt-2 mb-15 font-medium">
            Sign up
          </span>
          <div className="flex ">
            <Input placeholder={'Enter your email'} />
            <Button onClick={signUpNewUser} name={'Send'} />
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
