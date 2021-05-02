import './Login.css';
import React from 'react';
import Ident from '../Ident/Ident';
import useFormWithValidation from '../Ident/FormValidationHook/useFormWithValidation';
import Input from '../Ident/Form/Input/Input';

function Login({ handleLogIn }) {
  const {
    fieldsData,
    fieldsError,
    isSubmitButtonActive,
    serverError,
    serverErrorMessage,
    handleChange,
    handleSubmit,
    setIsSubmitButtonActive
  } = useFormWithValidation(
    {email: '', password: ''},
    handleLogIn,
    '/movies'
  );

  React.useEffect(() => {
    if (fieldsError.email || fieldsError.password || fieldsData.email === ''|| fieldsData.password === '') {
      setIsSubmitButtonActive(false);
    }
    else {
      setIsSubmitButtonActive(true);
    }
  }, [fieldsError, fieldsData, setIsSubmitButtonActive]);

  return (
    <Ident
      title="Рады видеть!"
      bottomQuestion={{
        question: 'Ещё не зарегистрированы?',
        link: {
          target: '/sign-up',
          text: 'Регистрация'
        }
      }}
      submitButtonText="Войти"
      handleSubmit={ handleSubmit }
      isSubmitButtonActive={ isSubmitButtonActive }
      serverError={ serverError }
      serverErrorMessage={ serverErrorMessage }
    >
      <Input
        name="email"
        label="E-mail"
        placeholder="Введите e-mail"
        type="email"
        value={fieldsData.email}
        onChange={handleChange}
        isRequired={true}
        validError={fieldsError.email}
        maxLength={50}
        errorMessage="Некорректный email."
      />
      <Input
        name="password"
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        value={fieldsData.password}
        onChange={handleChange}
        isRequired={true}
        validError={fieldsError.password}
        minLength={2}
        maxLength={30}
        errorMessage="Некорректный пароль."
      />
    </Ident>
  );
}

export default Login;
