import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Auth.css';
import { useAuth } from '../../helpers/Auth';
import InputWithValidator from '../../helpers/Validate';
import Doodle from '../../img/GroovySittingDoodle.png';

const Login = () => {
  const { authError, onLogin } = useAuth();
  const welcomeMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [formError, setFormError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const validForm = (username.length >= 5 && password.length >= 6);
    if (validForm) {
      setFormError(false);
      onLogin(username, password);
    } else {
      setFormError(true);
    }
  };

  return (
    <>
      {(welcomeMsg.state && showMsg) ? (
        <div className='PopupMsg'>
          {welcomeMsg.state}
          <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      <main className='AuthSection'>
        <div className='AuthForm'>
          <h1>Log in</h1>

          <form onSubmit={(e) => handleSubmit(e)} noValidate>
            <InputWithValidator
              required={true}
              labelText='Username'
              inputProps={{ type:'text', minLength:'5', pattern:'[a-zA-Z0-9_-]+' }}
              id='username'  
              checks={['tooShort', 'patternMismatch']}
              errorMessage='Username must be at least 5 characters long and contain no special characters'
              value={username} 
              onChange={(e) => {setUsername(e.target.value); setFormError(false); }}
            />

            <InputWithValidator
              required={true}
              labelText='Password'
              inputProps={{ type:'password', autoComplete:'on', minLength:'6', pattern:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}' }}
              id='password'  
              checks={['tooShort', 'patternMismatch']}
              errorMessage='Password must be at least than 6 characters long and contain an uppercase letter, number, and special character'
              value={password} 
              onChange={(e) => { setPassword(e.target.value); setFormError(false); }}
            />

            <p className={(authError && !formError) ? 'Error' : 'Error Hidden'}>{authError}</p>
            <p className={(formError) ? 'Error' : 'Error Hidden'}>Please complete required fields</p>

            <div className='ButtonGroup'>
              <button className='Btn PrimaryBtn'>Submit</button>
            </div>
          </form>

          <p>Don't have an account? <Link to='/register' className='InlineLink'>Register</Link></p>
        </div>

        <img src={Doodle} alt='groovy sitting doodle' className='AuthDoodle' />
      </main>
    </>
  );
};

export default Login;
