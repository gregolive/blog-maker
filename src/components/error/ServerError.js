import { Link } from 'react-router-dom';
import './Error.css';
import { useAuth } from '../../helpers/Auth';
import doodle from '../../img/JumpingDoodle.png';

const ServerError = ({ error }) => {
  const { token } = useAuth();

  return (
    <main className='ErrorPage'>
      <h1 className='ServerError'>{error.message}</h1>
      <strong>Error code: {error.code}</strong>
      
      <p>Please try again later.</p>
      {(token) ? (
        <Link to='/dashboard' className='Btn PrimaryBtn'>Back to home</Link>
      ) : (
        <Link to='/' className='Btn PrimaryBtn'>Back to home</Link>
      )}

      <img src={doodle} alt='jumping doodle' />
    </main>
  );
};

export default ServerError;
