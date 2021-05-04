import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import MainApi from '../utils/MainApi';
import Preloader from './Preloader/Preloader';
import Register from './Register/Register';
import Login from './Login/Login';
import RedirectAfterAuth from './RedirectAfterAuth/RedirectAfterAuth';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Main from './Main/Main';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import NotFound from './NotFound/NotFound';
import validator from 'validator';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [initializationFinished, setInitializationFinished] = React.useState(false);
  const [myMovies, setMyMovies] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    MainApi.getMyInfo()
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
        return MainApi.getMyMovies();
      })
      .then((myMovies) => {
        setMyMovies(myMovies);
        setInitializationFinished(true);
      })
      .catch((e) => {
        setInitializationFinished(true);
        console.log(e);
      });
  }, []);

  function handleRegister(dataUser) {
    return MainApi.signUp(dataUser)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      });
  }

  function handleLogIn(dataUser) {
    return MainApi.signIn(dataUser)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      });
  }

  function handleLogout() {
    return MainApi.signOut()
      .then(() => {
        history.push('/');
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
      });
  }

  function handleEditProfile(user) {
    return MainApi
      .editProfile(user.email === currentUser.email ? { name: user.name } : user)
      .then((user) => setCurrentUser(user));
  }

  function handleAddMyMovie(movie) {
    return MainApi.addMovie({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image ? 'https://api.nomoreparties.co' + movie.image.url : 'http://www.empty.com/asd.jpeg',
      trailer: (movie.trailerLink && validator.isURL(movie.trailerLink)) ? movie.trailerLink : 'http://www.empty.com',
      thumbnail: movie.image ?
        'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url : 'http://www.empty.com/asd.jpeg',
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN ? movie.nameEN : 'empty'
    })
      .then((movie) => setMyMovies([ ...myMovies, movie ]));
  }

  function handleDeleteMyMovie(movie) {
    return MainApi.deleteCard(movie._id)
      .then((movie) => {
        setMyMovies(myMovies.filter((deletedMovie) => deletedMovie._id !== movie._id))
        return movie;
      });
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      {!initializationFinished &&
        <Preloader fullScreen={true} />
      }
      {initializationFinished &&
        <>
          <Switch>
            <Route exact path="/">
              <Main loggedIn={loggedIn}/>
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
            handleAddMyMovie={handleAddMyMovie}
            handleDeleteMyMovie={handleDeleteMyMovie}
            myMovies={myMovies}
            />

            <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            handleDeleteMyMovie={handleDeleteMyMovie}
            myMovies={myMovies}
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
        </>
      }
    </CurrentUserContext.Provider>
  );
}

export default App;
