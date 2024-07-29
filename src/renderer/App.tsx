import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import '../components/Sidebar'
import Sidebar from '../components/Sidebar';
function Main() {
  return (
    <div>
      <Sidebar/>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
