import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Faltas from './pages/Faltas/Faltas';
import Materias from './pages/Materias/Materias';
import Notas from './pages/Notas/Notas';
import Provas from './pages/Provas/Provas';
import Trabalhos from './pages/Trabalhos/Trabalhos';
import Configuracoes from './pages/Configuracoes/Configuracoes';

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
        <Route path="/notas" element={<Notas />} />
        <Route path="/provas" element={<Provas />} />
        <Route path="/trabalhos" element={<Trabalhos />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        {/* Redireciona para /signup por padrão */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
