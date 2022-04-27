import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import PostForm from './components/post/PostForm';
import PostDetail from './components/post/PostDetail';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/new' element={<PostForm />} />
        <Route path='/post/:postTitle' element={<PostDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
