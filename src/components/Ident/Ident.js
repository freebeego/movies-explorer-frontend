import './Ident.css';
import { Link, useLocation } from 'react-router-dom';
import HeaderWithoutNavigation from '../HeaderWithoutNavigation/HeaderWithoutNavigation';
import Form from './Form/Form';

function Ident({ children, submitButtonText }) {
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="ident">
      <HeaderWithoutNavigation>
        {location.pathname === '/sign-up' ? 'Добро пожаловать!' : 'Рады видеть!' }
      </HeaderWithoutNavigation>
      <Form
        handleSubmit={ handleSubmit }
        submitButtonText={submitButtonText}
      >
        {children}
      </Form>
      <p className="ident__bottom-question">
        {location.pathname === '/sign-up' ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?' }
        <Link
          to={location.pathname === '/sign-up' ? '/sign-in' : '/sign-up' }
          className="ident__bottom-question-link"
        >
          {location.pathname === '/sign-up' ? 'Войти' : 'Регистрация' }
        </Link>
      </p>
    </section>
  );
}

export default Ident;
