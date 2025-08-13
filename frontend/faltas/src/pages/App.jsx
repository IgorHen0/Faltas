import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {

  const [currentPage, setCurrentPage] = useState('signup');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === 'login') {
    return <Login onNavigate={navigate} />;
  }

  if (currentPage === 'dashboard') {
    return <Dashboard />;
  }

  return <Signup onNavigate={navigate} />;
}

export default App;