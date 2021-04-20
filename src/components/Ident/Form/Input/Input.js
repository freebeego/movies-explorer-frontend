import './Input.css';

function Input({ label, placeholder, type }) {
  return (
    <label className="input">
      {label}
      <input
        placeholder={placeholder}
        type={type}
        className={'input__input-field' + (type === 'password' ? ' input__input-field_password' : '')}
      />
    </label>
  );
}

export default Input;
