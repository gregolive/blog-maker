import { useState, createContext, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState(null);

  const authRequest = async (username, password) => {
    const apiURL = 'http://localhost:3001/api/v1/login';
  
    axios.post(apiURL, {
      username,
      password,
    }).then((res) => {
      setToken(res.data.token);
    }, (err) => {
      setAuthError(err.response.data.message.message);
    });
  };

  const handleLogin = async (username, password) => {
    await authRequest(username, password);

    if (!authError) { navigate('/dashboard'); }
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    authError,
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
