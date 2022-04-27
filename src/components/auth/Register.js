import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiURL = 'http://localhost:3001/api/v1/user/create';
    axios.post(apiURL, {
      username,
      firstName,
      lastName,
      email,
      password,
    }).then((res) => {
      navigate('/dashboard', { state: res.data.post });
    }, (err) => {
      console.log(err);
    });
  };

  return (
    <main className='AuthSection'>
      <h1>Create an account</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor='username' className='RequiredField'>Username</label>
          <input type='text' name='username' id='username' minLength='5' maxLength='40' value={username} onChange={(e) => setUsername(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='first_name' className='RequiredField'>First name</label>
          <input type='text' name='first_name' id='first_name' maxLength='100' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='last_name' className='RequiredField'>Last name</label>
          <input type='text' name='last_name' id='last_name' maxLength='100' value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </fieldset> 

        <fieldset>
          <label htmlFor='email' className='RequiredField'>Email</label>
          <input type='email' name='email' id='email' minLength='5' maxLength='40' value={email} onChange={(e) => setEmail(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='password' className='RequiredField'>Password</label>
          <input type='password' name='password' id='password' autoComplete='on' minLength='6' value={password} onChange={(e) => setPassword(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='password_confirm' className='RequiredField'>Confirm Password</label>
          <input type='password' name='password_confirm' id='password_confirm' autoComplete='on' minLength='6' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        </fieldset>

        <div className='ButtonGroup'>
          <button className='Btn PrimaryBtn'>Submit</button>
        </div>
      </form>
    </main>
  );
};

export default Register;
