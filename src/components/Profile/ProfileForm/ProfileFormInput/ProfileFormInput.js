import './ProfileFormInput.css';

function ProfileFormInput({ label, placeholder, type }) {
  return (
    <label className="profile-form__input-label">
      {label}
      <input placeholder={placeholder} type={type} className="profile-form__input"/>
    </label>
  );
}

export default ProfileFormInput;
