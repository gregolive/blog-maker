import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import Doodle from '../../img/GroovySittingDoodle.png';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
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
  );
};

export default Login;
