import { useState, createContext, useContext, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [authError, setAuthError] = useState(null);

  // navigate when token updates
  useEffect(() => {
    navigate(location.pathname); // eslint-disable-next-line
  }, [token]);

  const setAuthData = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const authRequest = async (username, password) => {
    const apiURL = 'https://bitblog-go.herokuapp.com/api/v1/login';
  
    axios.post(apiURL, {
      username,
      password,
    }).then((res) => {
      setAuthData(res.data);
    }, (err) => {
      setAuthError(err.response.data.message.message);
    });
  };

  const handleLogin = async (username, password) => {
    await authRequest(username, password);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleUpdate = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const value = {
    token,
    user,
    authError,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onUpdate: handleUpdate
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

const UnauthenticatedRoute = ({ children }) => {
  const { token } = useAuth();
  
  if (token) {
    return <Navigate to='/dashboard' replace />;
  }
  return children;
};

export { AuthProvider, useAuth, ProtectedRoute, UnauthenticatedRoute };
