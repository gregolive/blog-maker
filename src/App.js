import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, ProtectedRoute, UnauthenticatedRoute } from './helpers/Auth';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import UserDetail from './components/user/UserDetail';
import UserForm from './components/user/UserForm';
import UserDelete from './components/user/UserDelete';
import PostForm from './components/post/PostForm';
import PostDetail from './components/post/PostDetail';
import PostDelete from './components/post/PostDelete';
import PostList from './components/post/PostList';
import PostListUser from './components/post/PostListUser';
import NotFound from './components/error/NotFound';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='*' element={<NotFound />} />
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
            path='/user/:username' 
            element={<ProtectedRoute><UserDetail /></ProtectedRoute>}
          />
          <Route 
            path='/user/:username/edit' 
            element={<ProtectedRoute><UserForm /></ProtectedRoute>}
          />
          <Route 
            path='/user/:username/delete' 
            element={<ProtectedRoute><UserDelete /></ProtectedRoute>}
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
          <Route 
            path='/post/:postTitle/delete' 
            element={<ProtectedRoute><PostDelete /></ProtectedRoute>}
          />
          <Route 
            path='/posts' 
            element={<ProtectedRoute><PostList /></ProtectedRoute>}
          />
          <Route 
            path='/posts/:username' 
            element={<ProtectedRoute><PostListUser /></ProtectedRoute>}
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
