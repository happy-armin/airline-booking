import './styles/App.css';
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Login, Register, Dashboard } from 'pages';
import { Header } from 'components';
import { useAppContext } from 'contexts';

const App: React.FC = () => {
  const { token, setToken } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-grey-dark text-white">
      <Header onLogout={handleLogout}></Header>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
