import './Login.css';
import React from 'react';
import Ident from '../Ident/Ident';
import Input from '../Ident/Form/Input/Input';

function Login({ handleLogIn }) {
  return (
    <Ident
      onLogIn={ handleLogIn }
      submitButtonText="Войти"
    >
      <Input
        label="E-mail"
        placeholder="Введите e-mail"
        type="email"
      />
      <Input
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
      />
    </Ident>
  );
}

export default Login;
