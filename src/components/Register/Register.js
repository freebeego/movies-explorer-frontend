import './Register.css';
import React from 'react';
import Ident from '../Ident/Ident';
import Input from '../Ident/Form/Input/Input';

function Register({ handleRegister }) {
  return (
    <Ident
      onRegister={ handleRegister }
      submitButtonText="Зарегистрироваться"
    >
      <Input
        label="Имя"
        placeholder="Введите имя"
        type="text"
      />
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

export default Register;
