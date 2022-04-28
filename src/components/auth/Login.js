import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import Doodle from '../../img/GroovySittingDoodle.png';

const Login = () => {
  const navigate = useNavigate();
  const welcomeMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formSubmit = () => {
    const apiURL = 'http://localhost:3001/api/v1/login';

    axios.post(apiURL, {
      username,
      password,
    }).then((res) => {
      navigate(`/post/${res.data.url}`, { state: res.data.post });
    }, (err) => {
      console.log(err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit();
  };

  return (
    <>
      {(welcomeMsg.state && showMsg) ? (
        <div className='WelcomeMsg'>
          {welcomeMsg.state}
          <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      <main className='AuthSection'>
        <div className='AuthForm'>
          <h1>Log in</h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <fieldset>
              <label htmlFor='username' className='RequiredField'>Username</label>
              <input type='text' name='username' id='username' minLength='5' maxLength='40' value={username} onChange={(e) => setUsername(e.target.value)} />
            </fieldset>

            <fieldset>
              <label htmlFor='password' className='RequiredField'>Password</label>
              <input type='password' name='password' id='password' autoComplete='on' minLength='6' value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>

            <div className='ButtonGroup'>
              <button className='Btn PrimaryBtn'>Submit</button>
            </div>
          </form>
        </div>

        <img src={Doodle} alt='groovy sitting doodle' className='AuthDoodle' />
      </main>
    </>
  );
};

export default Login;
