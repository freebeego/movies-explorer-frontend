import './Form.css';

function Form({ children, handleSubmit, submitButtonText }) {
  return (
    <form onSubmit={handleSubmit} className="form">
      {children}
      <button type="submit" className="form__submit-button">
        {submitButtonText}
      </button>
    </form>
  );
}

export default Form;
