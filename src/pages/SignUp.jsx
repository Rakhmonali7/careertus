import { createClient } from '@supabase/supabase-js';
import Button from '../components/Button';
import Template from '../components/Template';

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
      <Template></Template>
    </>
  );
}
export default SignUp;
