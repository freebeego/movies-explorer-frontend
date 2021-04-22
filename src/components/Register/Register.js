import './Register.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Ident from '../Ident/Ident';
import Input from '../Ident/Form/Input/Input';

function Register({ handleRegister, loggedIn }) {
  const [fieldsData, setFieldsData] = React.useState({ name: '', email: '', password: '' });
  const [fieldsError, setFieldsError] = React.useState({ name: '', email: false, password: false });
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    if (
      fieldsError.name || fieldsError.email || fieldsError.password ||
      fieldsData.name === '' || fieldsData.email === '' || fieldsData.password === ''
    ) {
      setIsSubmitButtonActive(false);
    }
    else {
      setIsSubmitButtonActive(true);
    }
  }, [fieldsError, fieldsData]);

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(fieldsData)
      .then(() => history.push('/movies'))
      .catch((err) => {
        console.log(err)
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
      [e.target.name]: !e.target.validity.valid
    });
  }

  return (
    <Ident
      title="Добро пожаловать!"
      bottomQuestion={{
        question: 'Уже зарегистрированы?',
        link: {
          target: '/sign-in',
          text: 'Войти'
        }
      }}
      onRegister={ handleRegister }
      submitButtonText="Зарегистрироваться"
      handleSubmit={handleSubmit}
      isSubmitButtonActive={isSubmitButtonActive}
      serverError={ serverError }
      serverErrorMessage={ serverErrorMessage }
      loggedIn={loggedIn}
    >
      <Input
        name="name"
        label="Имя"
        placeholder="Введите имя"
        type="text"
        value={fieldsData.name}
        onChange={handleChange}
        isRequired={true}
        validError={fieldsError.name}
        maxLength={30}
        pattern="(.*(?<=\s*)[a-zA-Zа-яА-ЯёЁ\-]+.*(?=\s*)){2,30}"
        errorMessage="Некорректное имя."
      />
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

export default Register;
