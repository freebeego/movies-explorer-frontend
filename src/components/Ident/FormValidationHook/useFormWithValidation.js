import React from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

function useFormWithValidation(initialFieldsData, onSubmit, pushPathOnSubmitSuccess) {
  const [fieldsData, setFieldsData] = React.useState(initialFieldsData);
  const [fieldsError, setFieldsError] = React.useState({});
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(fieldsData)
      .then(() => {
        if (pushPathOnSubmitSuccess) history.push(pushPathOnSubmitSuccess);
        setServerError(false);
        setServerErrorMessage('');
      })
      .catch((err) => {
        setServerErrorMessage(err);
        setServerError(true);
      });
  }

  function handleChange(e) {
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target.value
    });

    setFieldsError({
      ...fieldsError,
      [e.target.name]: e.target.name === 'email' ? !validator.isEmail(e.target.value) : !e.target.validity.valid
    });
  }

  return {
    fieldsData,
    fieldsError,
    isSubmitButtonActive,
    serverError,
    serverErrorMessage,
    handleChange,
    handleSubmit,
    setFieldsData,
    setIsSubmitButtonActive
  };
}

export default useFormWithValidation;
