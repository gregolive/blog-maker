import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User.css';
import { useAuth } from '../../helpers/Auth';
import ServerError from '../error/ServerError';
import InputWithValidator from '../../helpers/Validate';
import Doodle from '../../img/MeditatingDoodle.png';

const UserForm = () => {
  const navigate = useNavigate();
  const { user, onUpdate } = useAuth();
  const [serverError, setServerError] = useState(false);
  const [submitErrors, setSubmitErrors] = useState({});
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    current_password: '',
    new_password: '',
    new_password_confirm: '',
  });

  const formSubmit = () => {
    const apiURL = `http://localhost:3001/api/v1/user/${user._id}/update`;

    axios.post(apiURL, {
      _id: user._id,
      username: formData.username,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      current_password: formData.current_password,
      new_password: formData.new_password,
    }).then((res) => {
      console.log(res.data.updated_user)
      onUpdate(res.data.updated_user);
      navigate(`/user/${user.username}`, { state: res.data.msg });
    }, (err) => {
      if (err.response.status === 400) {
        setSubmitErrors(err.response.data.errors);
      } else {
        setServerError(err);
      }
    });
  };

  const checkForm = () => {
    if (formData.new_password === '') {
      return !(Object.values(formData).some((input, index) => input === '' && index < 5));
    }
    return !(Object.values(formData).some((input) => input === ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validForm = checkForm();
    if (validForm) {
      setFormError(false);
      formSubmit();
    } else {
      setFormError(true);
    }
  };

  // remove server error msg when user updates field
  const removeServerError = (inputName) => {
    if (Object.keys(submitErrors).includes(inputName)) {
      setSubmitErrors((prevState) => {
        const updatedErrors = {...prevState};
        delete updatedErrors[inputName];
        return updatedErrors;
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeServerError(e.target.name);
    if (formError) { setFormError(false); }
  };

  return ((serverError) ? <ServerError error={serverError} /> : (
    <main className='AuthSection'>
      <div className='AuthForm'>
        <h1>Update account details</h1>

        <form onSubmit={(e) => handleSubmit(e)} noValidate>
          <InputWithValidator
            required={true}
            labelText='Username'
            inputProps={{ type:'text', minLength:'5', maxLength:'40', pattern:'[a-zA-Z0-9_-]+' }}
            id='username'  
            checks={['tooShort', 'patternMismatch']}
            errorMessage='Username must be at least 5 characters long and contain no special characters'
            value={formData.username} 
            onChange={(e) => handleChange(e)}
            serverError={submitErrors['username']}
          />

          <InputWithValidator
            required={true}
            labelText='First name'
            inputProps={{ type:'text', pattern:'[a-zA-Z- ]+' }}
            id='first_name'  
            checks={['valueMissing', 'patternMismatch']}
            errorMessage='First name cannot contain numbers or special characters'
            value={formData.first_name} 
            onChange={(e) => handleChange(e)}
            serverError={submitErrors['first_name']}
          />

          <InputWithValidator
            required={true}
            labelText='Last name'
            inputProps={{ type:'text', pattern:'[a-zA-Z- ]+' }}
            id='last_name'  
            checks={['valueMissing', 'patternMismatch']}
            errorMessage='Last name cannot contain numbers or special characters'
            value={formData.last_name} 
            onChange={(e) => handleChange(e)}
            serverError={submitErrors['last_name']}
          />

          <InputWithValidator
            required={true}
            labelText='Email'
            inputProps={{ type:'email' }}
            id='email'  
            checks={['valueMissing', 'typeMismatch']}
            errorMessage='Must be a valid email address'
            value={formData.email} 
            onChange={(e) => handleChange(e)}
            serverError={submitErrors['email']}
          />

          <InputWithValidator
            required={true}
            labelText='Current Password'
            inputProps={{ type:'password', autoComplete:'on', minLength:'6', pattern:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}' }}
            id='current_password'  
            checks={['tooShort', 'patternMismatch']}
            errorMessage='Password must be at least than 6 characters long and contain an uppercase letter, number, and special character'
            value={formData.password} 
            onChange={(e) => handleChange(e)}
            serverError={submitErrors['password']}
          />

          <InputWithValidator
            labelText='New Password'
            inputProps={{ type:'password', autoComplete:'off', minLength:'6', pattern:'(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{6,}' }}
            id='new_password'  
            checks={['tooShort', 'patternMismatch']}
            errorMessage='Password must be at least than 6 characters long and contain an uppercase letter, number, and special character'
            value={formData.new_password} 
            onChange={(e) => handleChange(e)}
            serverError={submitErrors['password']}
          />

          <InputWithValidator
            labelText='New Password Confirmation'
            inputProps={{ type:'password', autoComplete:'off', pattern:`${formData.new_password}` }}
            id='new_password_confirm'  
            checks={['valueMissing', 'patternMismatch']}
            errorMessage='Passwords must match'
            value={formData.new_password_confirm} 
            onChange={(e) => handleChange(e)}
          />

          <p className={(formError) ? 'Error' : 'Error Hidden'}>Please complete required fields</p>

          <div className='ButtonGroup'>
            <button className='Btn PrimaryBtn'>Submit</button>
          </div>
        </form>

        <p>Please enter current password to confirm any changes.</p>
      </div>

      <img src={Doodle} alt='meditating doodle' className='AuthDoodle' />
    </main>
  ));
};

export default UserForm;
