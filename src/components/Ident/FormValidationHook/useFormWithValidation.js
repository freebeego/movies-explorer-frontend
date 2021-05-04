import React from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';

function useFormWithValidation(initialFieldsData, onSubmit, pushPathOnSubmitSuccess) {
  const [fieldsData, setFieldsData] = React.useState(initialFieldsData);
  const [fieldsError, setFieldsError] = React.useState({});
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);
  const [isThereServerMessage, setIsThereServerMessage] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState('');
  const [isSubmitResultOk, setIsSubmitResultOk] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState(0);

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(fieldsData)
      .then(() => {
        if (pushPathOnSubmitSuccess) history.push(pushPathOnSubmitSuccess);
        setIsThereServerMessage(false);
        setServerMessage('');
        setIsSubmitResultOk(true);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        setTimeoutId(
          setTimeout(
            () => {
              setIsSubmitResultOk(false);
              setTimeoutId(0);
            },
            3000)
        );
      })
      .catch((err) => {
        setServerMessage(err);
        setIsThereServerMessage(true);
        setIsSubmitResultOk(false);
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
    isThereServerMessage,
    serverMessage,
    handleChange,
    handleSubmit,
    setFieldsData,
    setIsSubmitButtonActive,
    isSubmitResultOk
  };
}

export default useFormWithValidation;
