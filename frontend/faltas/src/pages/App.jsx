import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Faltas from './Faltas';
import Materias from './Materias';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faltas" element={<Faltas />} />
        <Route path="/materias" element={<Materias />} />
        {/* Redireciona para /signup por padrão */}
        <Route path="*" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
