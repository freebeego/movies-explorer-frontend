import './Nav.css';
import React from 'react';
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();

  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  React.useEffect(
    () => {
      document.body.style.overflow = isMenuOpened ? 'hidden' : 'auto';
    },
    [isMenuOpened]
  );

  const switchMenu = () => setIsMenuOpened(!isMenuOpened);

  return (
    <>
      <button className="hamburger-menu-button" onClick={switchMenu}>
              <span className={'hamburger-menu-button__pseudoicon' + (isMenuOpened ? ' hamburger-menu-button__pseudoicon_on' : '')}>
              </span>
      </button>
      <div onClick={switchMenu} className={'overlay' + (isMenuOpened ? ' overlay_active' : '')} />
      <nav className={'nav' + (isMenuOpened ? ' nav_opened' : '')}>
        <ul className="nav__list">
          <li className="nav__list-item">
            <Link
              to="/"
              className={"nav__link" + (location.pathname === "/" ? " nav__link_active" : "")}
            >
              Главная
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              to="/movies"
              className={"nav__link" + (location.pathname === "/movies" ? " nav__link_active" : "")}
            >
              Фильмы
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              to="/saved-movies"
              className={"nav__link" + (location.pathname === "/saved-movies" ? " nav__link_active" : "")}
            >
              Сохранённые фильмы
            </Link>
          </li>
          <li className="nav__list-item">
            <Link
              to="/profile"
              className={"nav__link nav__link_profile" + (location.pathname === "/profile" ? " nav__link_active" : "")}
            >
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
