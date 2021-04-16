import './Header.css';
import React from 'react';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Link to="/" className="header__link header__link_logo">
        <Logo />
      </Link>
      {!loggedIn &&
        <ul className="header__auth-list">
          <li className="header__auth-list-item">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </li>
          <li className="header__auth-list-item">
            <Link to="/sign-in" className="header__link header__link_sign-in">
              Войти
            </Link>
          </li>
        </ul>
      }
    </header>
  );
}

export default Header;
