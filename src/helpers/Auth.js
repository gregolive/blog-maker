import { useState, createContext, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

const authRequest = async (username, password) => {
  const apiURL = 'http://localhost:3001/api/v1/login';

  const res = await axios.post(apiURL, {
    username,
    password,
  });
  return res.data.token;
};

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const handleLogin = async (username, password) => {
    const apiToken = await authRequest(username, password);
    console.log(typeof apiToken)
    setToken(apiToken);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export { AuthProvider, useAuth, ProtectedRoute };
