import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './Register';
import Nav from './Nav';
import Main from './Main';

function Layout() {
  const location = useLocation(); // Get the current path

  return (
    <>
      <div>
        {/* Show <Nav /> only if the route is NOT "/register" */}
        {location.pathname !== '/register' && <Nav />}

        {/* Define the main content */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
