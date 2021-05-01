import './ProfileForm.css';

function ProfileForm({
                       children,
                       handleSubmit,
                       submitButtonText,
                       isSubmitButtonActive,
                       serverError,
                       serverErrorMessage
}) {
  return (
    <form
      onSubmit={ handleSubmit }
      className="profile-form"
      noValidate={true}
    >
      { children }
      <span
        className={ 'profile-form__error' + (serverError ? ' profile-form__error_active' : '') }
      >
        {serverErrorMessage}
      </span>
      <button
        type="submit"
        className={ 'profile-form__button'  + (!isSubmitButtonActive ? ' profile-form__button_disabled' : '') }
        disabled={ !isSubmitButtonActive }
      >
        { submitButtonText }
      </button>
    </form>
  );
}

export default ProfileForm;
