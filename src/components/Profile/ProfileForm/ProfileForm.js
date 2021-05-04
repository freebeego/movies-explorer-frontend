import './ProfileForm.css';

function ProfileForm({
                       children,
                       handleSubmit,
                       submitButtonText,
                       isSubmitButtonActive,
                       isThereServerMessage,
                       serverMessage,
                       isSubmitResultOk
}) {
  return (
    <form
      onSubmit={ handleSubmit }
      className="profile-form"
      noValidate={true}
    >
      { children }
      <span
        className={ 'profile-form__error' + (isSubmitResultOk ? ' profile-form__error_none' :
          isThereServerMessage ? ' profile-form__error_active' : '') }
      >
        {isSubmitResultOk ? 'Данные профиля успешно обновлены.' : serverMessage}
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
