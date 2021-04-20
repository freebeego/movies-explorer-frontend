import './HeaderWithoutNavigation.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function HeaderWithoutNavigation({ children }) {
  return (
    <div className="header-without-navigation">
      <Link to="/" className="header-without-navigation__logo-link">
        <Logo />
      </Link>
      <h1 className="header-without-navigation__title">
        {children}
      </h1>
    </div>
  );
}

export default HeaderWithoutNavigation;
