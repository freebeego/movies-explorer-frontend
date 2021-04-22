import './App.css';
import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import mainApi from '../utils/MainApi';
import Register from './Register/Register';
import Login from './Login/Login';
import RedirectAfterAuth from './RedirectAfterAuth/RedirectAfterAuth';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import NotFound from './NotFound/NotFound';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    mainApi.getMyInfo()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        if (
          location.pathname !== '/' &&
          location.pathname !== '/sign-in' &&
          location.pathname !== '/sign-up'
        ) {
          history.push('/sign-in');
        }
      });
  }, [history, location]);

  function handleRegister(dataUser) {
    return mainApi.signUp(dataUser)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      });
  }

  function handleLogIn(dataUser) {
    return mainApi.signIn(dataUser)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      });
  }

  function handleLogout() {
    return mainApi.signOut()
      .then(() => {
        setCurrentUser({});
        setLoggedIn(false);
      });
  }

  function handleEditProfile(user) {
    return mainApi.editProfile(user)
      .then((user) => {
        setCurrentUser(user);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={ loggedIn } />
        </Route>

        <RedirectAfterAuth
          exact
          path="/sign-up"
          component={Register}
          loggedIn={loggedIn}
          handleRegister={handleRegister}
        />

        <RedirectAfterAuth
          exact
          path="/sign-in"
          component={Login}
          loggedIn={loggedIn}
          handleLogIn={handleLogIn}
        />

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
          handleLogout={handleLogout}
          handleEditProfile={handleEditProfile}
        />

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
