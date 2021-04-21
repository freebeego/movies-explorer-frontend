import './ProfileFormInput.css';

function ProfileFormInput({ label, placeholder, type }) {
  function toggleActiveClass(e) {
    e.currentTarget.classList.toggle('profile-form__input-label_active')
  }

  return (
    <label
      onFocus={toggleActiveClass}
      onBlur={toggleActiveClass}
      className="profile-form__input-label"
    >
      { label }
      <input
        placeholder={ placeholder }
        type={ type }
        spellCheck={ false }
        className="profile-form__input"
      />
    </label>
  );
}

export default ProfileFormInput;
