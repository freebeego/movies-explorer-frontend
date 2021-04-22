import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import mainApi from '../utils/MainApi';
import Register from './Register/Register';
import Login from './Login/Login';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import NotFound from './NotFound/NotFound';

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleRegister(dataUser) {
    mainApi.signUp(dataUser)
      .then(({ _id, ...user }) => {
        setCurrentUser(user);
        setLoggedIn(true);
        history.push('/movies')
      })
      .catch((err) => console.log(err));
  }

  function handleLogIn(dataUser) {
    mainApi.signIn(dataUser)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        history.push('/movies')
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={ loggedIn } />
        </Route>

        {!loggedIn &&
          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
            />
          </Route>
        }

        {!loggedIn &&
        <Route path="/sign-in">
          <Login
            handleLogIn={handleLogIn}
          />
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
