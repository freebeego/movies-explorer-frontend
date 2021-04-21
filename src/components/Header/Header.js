import './Header.css';
import React from 'react';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <header className={'header' + (location.pathname === "/" ? ' header_grey' : '')}>
      {
        location.pathname !== "/" ?
          <Link to="/" className="header__link header__link_logo">
            <Logo />
          </Link>
          :
          <Logo />
      }
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
