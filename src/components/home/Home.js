import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <main>
      <h1>Welcome to bitblog</h1>

      <p>
        You don't have any blog posts. <Link to='/post/new' className='inline-link'>Create one now!</Link>
      </p>
    </main>
  );
};

export default Home;
