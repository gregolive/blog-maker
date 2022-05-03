import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, ProtectedRoute, UnauthenticatedRoute } from './helpers/Auth';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PostForm from './components/post/PostForm';
import PostDetail from './components/post/PostDetail';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/register'
            element={<UnauthenticatedRoute><Register /></UnauthenticatedRoute>}
          />
          <Route 
            path='/login'
            element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>}
          />
          <Route 
            path='/dashboard' 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route 
            path='/post/new' 
            element={<ProtectedRoute><PostForm title='New blog post' /></ProtectedRoute>}
          />
          <Route 
            path='/post/:postTitle' 
            element={<ProtectedRoute><PostDetail /></ProtectedRoute>}
          />
          <Route 
            path='/post/:postTitle/edit' 
            element={<ProtectedRoute><PostForm title='Edit blog post' /></ProtectedRoute>}
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
