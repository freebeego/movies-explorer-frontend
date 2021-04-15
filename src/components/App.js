import React from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import './App.css';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Main from './Main/Main';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        {!loggedIn &&
          <Route path="/sign-up">
            {/*<Register
              onRegister={handleRegister}
              submitButtonStateOfSending={submitButtonStateOfSending}
              submitButtonErrorIndication={submitButtonErrorIndication}
            />*/}
          </Route>
        }

        {!loggedIn &&
        <Route path="/sign-in">
          {/*<Login
            onLogIn={handleLogIn}
            submitButtonStateOfSending={submitButtonStateOfSending}
            submitButtonErrorIndication={submitButtonErrorIndication}
          />*/}
        </Route>
        }

        <ProtectedRoute
          exact
          path="/"
          component={Main}
          loggedIn={loggedIn}
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
        />

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
