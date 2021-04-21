import React from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import './App.css';
import Ident from './Ident/Ident';
import Input from './Ident/Form/Input/Input';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import NotFound from './NotFound/NotFound';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(true);

  function handleRegister() {
    console.log('register');
  }

  function handleLogIn() {
    console.log('login');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={ loggedIn } />
        </Route>

        {!loggedIn &&
          <Route path="/sign-up">
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
                placeholder="Введите email"
                type="email"
              />
              <Input
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
              />
            </Ident>
          </Route>
        }

        {!loggedIn &&
        <Route path="/sign-in">
          <Ident
            onLogIn={ handleLogIn }
            submitButtonText="Войти"
          >
            <Input
              label="E-mail"
              placeholder="Введите email"
              type="email"
            />
            <Input
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
            />
          </Ident>
        </Route>
        }

        <ProtectedRoute
          exact
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
        />

        <ProtectedRoute
          exact
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
        />

        <ProtectedRoute
          exact
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
        />

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
