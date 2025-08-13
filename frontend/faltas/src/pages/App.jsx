import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Faltas from './Faltas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faltas" element={<Faltas />} />
        {/* Redireciona para /signup por padrão */}
        <Route path="*" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
