import './Login.css';
import React from 'react';
import Ident from '../Ident/Ident';
import Input from '../Ident/Form/Input/Input';

function Login({ handleLogIn }) {
  const [fieldsData, setFieldsData] = React.useState({email: '', password: ''});
  const [fieldsError, setFieldsError] = React.useState({email: false, password: false});
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  React.useEffect(() => {
    if (fieldsError.email || fieldsError.password || fieldsData.email === ''|| fieldsData.password === '')
      setIsSubmitButtonActive(false);
    else setIsSubmitButtonActive(true);
  }, [fieldsError, fieldsData]);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogIn(fieldsData);
  }

  function handleChange(e) {
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target.value
    });

    setFieldsError({
      ...fieldsError,
      [e.target.name]: !e.target.validity.valid
    });
  }

  return (
    <Ident
      onLogIn={ handleLogIn }
      submitButtonText="Войти"
      handleSubmit={handleSubmit}
      isSubmitButtonActive={isSubmitButtonActive}
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
