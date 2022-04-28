import { useState } from 'react';

const InputWithValidator = ({ 
  required,
  labelText,
  id,
  inputProps,
  checks,
  errorMessage,
  value,
  onChange,
}) => {
  const [isValid, setIsValid] = useState(true);

  const checkValidity = (e) => {
    const { validity } = e.target;
    const checksPassed = checks.filter((check) => validity[check]).length === 0;
    setIsValid(checksPassed);
  };

  return (
    <fieldset>
      <label htmlFor={id} className={(required) ? 'RequiredField' : ''}>{labelText}</label>
      <input id={id} name={id} {...inputProps} onBlur={checkValidity} value={value} onChange={onChange} className={isValid ? '' : 'InvalidInput'}/>
      <p className={(isValid) ? 'Error Hidden' : 'Error'}>{errorMessage}</p>
    </fieldset>
  );
};

export default InputWithValidator;
