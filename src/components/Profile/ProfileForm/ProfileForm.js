import './ProfileForm.css';

function ProfileForm({ children }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {children}
      <button type="submit" className="profile-form__button">Редактировать</button>
    </form>
  );
}

export default ProfileForm;
