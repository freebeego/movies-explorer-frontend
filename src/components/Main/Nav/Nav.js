import './Nav.css';
import { Link } from 'react-router-dom';
import React from 'react';

function Nav() {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  const onClickMenu = () => setIsMenuOpened(!isMenuOpened);

  return (
    <>
      <button className="hamburger-menu-button" onClick={onClickMenu}>
              <span className={'hamburger-menu-button__pseudoicon' + (isMenuOpened ? ' hamburger-menu-button__pseudoicon_on' : '')}>
              </span>
      </button>

      <nav className={'nav' + (isMenuOpened ? ' nav_opened' : '')}>
        <ul className="nav__list">
          <li className="nav__list-item">
            <Link to="/" className="nav__link">
              Главная
            </Link>
          </li>
          <li className="nav__list-item">
            <Link to="/movies" className="nav__link">
              Фильмы
            </Link>
          </li>
          <li className="nav__list-item">
            <Link to="/saved-movies" className="nav__link">
              Сохранённые фильмы
            </Link>
          </li>
          <li className="nav__list-item">
            <Link to="/profile" className="nav__link nav__link_profile">
              <span className="nav__link-text">Аккаунт</span>
              <div className="nav__profile-icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
