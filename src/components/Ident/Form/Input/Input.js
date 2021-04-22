import './Input.css';

function Input({
                 name,
                 label,
                 placeholder,
                 type,
                 value,
                 onChange,
                 isRequired,
                 validError,
                 maxLength,
                 minLength,
                 errorMessage,
                 pattern
}) {
  const inputOptions = {};

  inputOptions['name'] = name;
  inputOptions['type'] = type;
  inputOptions['placeholder'] = placeholder;
  if (maxLength) inputOptions['maxLength'] = maxLength;
  if (minLength) inputOptions['minLength'] = minLength;
  if (value !== undefined) inputOptions['value'] = value;
  if (onChange) inputOptions['onChange'] = onChange;
  if (pattern) inputOptions['pattern'] = pattern;
  if (isRequired) inputOptions['required'] = true;

  return (
    <>
      <label className="input">
        {label}
        <input
          {...inputOptions}
          className={'input__input-field' + (validError ? ' input__input-field_error' : '')}
        />
      </label>
      <span
        className={'input__error' + (validError ? ' input__error_active' : '')}
      >
        {errorMessage}
      </span>
    </>
  );
}

export default Input;
