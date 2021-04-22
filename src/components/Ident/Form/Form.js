import './Form.css';

function Form({ children, handleSubmit, submitButtonText, isSubmitButtonActive }) {
  return (
    <form
      onSubmit={handleSubmit}
      noValidate={true}
      className="form"
    >
      {children}
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
