import { Link } from 'react-router-dom';
import './Error.css';
import { useAuth } from '../../helpers/Auth';
import doodle from '../../img/CoffeeDoodle.png';

const NotFound = () => {
  const { token } = useAuth();

  return (
    <main className='ErrorPage'>
      <h1>404</h1>
      <strong>Whoops! Page not found.</strong>
      
      <p>Our devs must've forgotten their coffee this morning!</p>
      {(token) ? (
        <Link to='/dashboard' className='InlineLink'>Head back home</Link>
      ) : (
        <Link to='/' className='InlineLink'>Head back home</Link>
      )}

      <img src={doodle} alt='coffee doodle' />
    </main>
  );
}

export default NotFound;
