import './ProfileFormInput.css';

function ProfileFormInput({
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
                            pattern,
                            spellCheck = false
}) {
  const inputOptions = {};

  inputOptions['name'] = name;
  inputOptions['type'] = type;
  inputOptions['placeholder'] = placeholder;
  inputOptions['spellCheck'] = spellCheck;

  if (maxLength) inputOptions['maxLength'] = maxLength;
  if (minLength) inputOptions['minLength'] = minLength;
  if (value !== undefined) inputOptions['value'] = value;
  if (onChange) inputOptions['onChange'] = onChange;
  if (pattern) inputOptions['pattern'] = pattern;
  if (isRequired) inputOptions['required'] = true;

  function toggleActiveClass(e) {
    e.currentTarget.classList.toggle('profile-form__input-label_active')
  }

  return (
    <>
      <label
        onFocus={toggleActiveClass}
        onBlur={toggleActiveClass}
        className="profile-form__input-label"
      >
        { label }
        <input
          { ...inputOptions }
          className="profile-form__input"
        />
      </label>
      <span
        className={'profile-form__input-error' + (validError ? ' profile-form__input-error_active' : '')}
      >
        {errorMessage}
      </span>
    </>
  );
}

export default ProfileFormInput;
