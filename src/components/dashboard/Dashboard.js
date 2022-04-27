import { Link } from 'react-router-dom';
import './Dashboard.css';
import { useAuth } from '../../helpers/Auth';

const Dashboard = () => {
  const token = useAuth();

  return (
    <main>
      <h1>Welcome to bitblog</h1>

      <p>
        You don't have any blog posts. <Link to='/post/new' className='InlineLink'>Create one now!</Link>
      </p>

      <div>Authenticated as {token}</div>
    </main>
  );
};

export default Dashboard;
