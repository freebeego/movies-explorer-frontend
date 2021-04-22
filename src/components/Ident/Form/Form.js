import './Form.css';

function Form({
                children,
                handleSubmit,
                submitButtonText,
                isSubmitButtonActive,
                serverError,
                serverErrorMessage
}) {
  return (
    <form
      onSubmit={handleSubmit}
      noValidate={true}
      className="form"
    >
      {children}
      <span
        className={'form__error' + (serverError ? ' form__error_active' : '')}
      >
        {serverErrorMessage}
      </span>
      <button
        type="submit"
        className={'form__submit-button' + (!isSubmitButtonActive ? ' form__submit-button_disabled' : '')}
        disabled={!isSubmitButtonActive}
      >
        {submitButtonText}
      </button>
    </form>
  );
}

export default Form;
