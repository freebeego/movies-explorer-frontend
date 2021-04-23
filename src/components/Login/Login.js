import './Login.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import Ident from '../Ident/Ident';
import Input from '../Ident/Form/Input/Input';

function Login({ handleLogIn, loggedIn }) {
  const [fieldsData, setFieldsData] = React.useState({email: '', password: ''});
  const [fieldsError, setFieldsError] = React.useState({email: false, password: false});
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    if (fieldsError.email || fieldsError.password || fieldsData.email === ''|| fieldsData.password === '') {
      setIsSubmitButtonActive(false);
    }
    else {
      setIsSubmitButtonActive(true);
    }
  }, [fieldsError, fieldsData]);

  function handleSubmit(e) {
    e.preventDefault();
    handleLogIn(fieldsData)
      .then(() => history.push('/movies'))
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
      onLogIn={ handleLogIn }
      submitButtonText="Войти"
      handleSubmit={handleSubmit}
      isSubmitButtonActive={isSubmitButtonActive}
      serverError={ serverError }
      serverErrorMessage={ serverErrorMessage }
      loggedIn={ loggedIn }
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
