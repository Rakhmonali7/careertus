import { useState } from 'react';
import Register from './pages/Register';
import Nav from './pages/Nav';
import Main from './pages/Main';

function App() {
  return (
    <>
      <div className="pt-12 px-50">
        <Nav />
        <Main />
      </div>

      {/* <Register /> */}
    </>
  );
}

export default App;
