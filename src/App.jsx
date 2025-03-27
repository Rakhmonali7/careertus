import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
function App() {
  return (
    <Router>
      <div>
        <Layout /> {/* Wrap everything inside Layout */}
      </div>
    </Router>
  );
}

export default App;
