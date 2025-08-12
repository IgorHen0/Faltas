import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function App() {

  const [currentPage, setCurrentPage] = useState('signup');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  if (currentPage === 'login') {
    return <Login onNavigate={navigate} />;
  }

  return <Signup onNavigate={navigate} />;
}

export default App