import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './Register';
import Nav from './Nav';
import Main from './Main';
import SignUp from './SignUp';
import Applicant from './Applicant';
import AccountSetting from './AccountSetting';

function Layout() {
  const location = useLocation(); // Get the current path

  return (
    
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/applicant" element={<Applicant/>} />
          <Route path="/accountSetting" element={<AccountSetting/>} />
        </Routes>
      </div>
    
  );
}

export default Layout;
