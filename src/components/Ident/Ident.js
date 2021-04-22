import './Ident.css';
import { Link, useLocation } from 'react-router-dom';
import HeaderWithoutNavigation from '../HeaderWithoutNavigation/HeaderWithoutNavigation';
import Form from './Form/Form';

function Ident({
                 children,
                 submitButtonText,
                 handleSubmit,
                 isSubmitButtonActive,
                 serverError,
                 serverErrorMessage
}) {
  const location = useLocation();

  return (
    <section className="ident">
      <HeaderWithoutNavigation>
        {location.pathname === '/sign-up' ? 'Добро пожаловать!' : 'Рады видеть!' }
      </HeaderWithoutNavigation>
      <Form
        handleSubmit={ handleSubmit }
        submitButtonText={ submitButtonText }
        isSubmitButtonActive={ isSubmitButtonActive }
        serverError={ serverError }
        serverErrorMessage={ serverErrorMessage }
      >
        { children }
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
