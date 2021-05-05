import './App.css';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import MainApi from '../utils/MainApi';
import getMovies from '../utils/moviesApi';
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
import { API_MOVIES, EMPTY_LINK, EMPTY_TEXT_FIELD } from '../config/constants';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [initializationFinished, setInitializationFinished] = React.useState(false);
  const [serverIsNotAvailable, setServerIsNotAvailable] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [myMovies, setMyMovies] = React.useState([]);

  const history = useHistory();

  React.useEffect(() => {
    MainApi.getMyInfo()
      .then((user) => Initialization(user))
      .catch((e) => {
        setInitializationFinished(true);
        console.log(e);
      });
  }, []);

  function Initialization(user) {
    setInitializationFinished(false);
    Promise.all([MainApi.getMyMovies(), getMovies()])
      .then(([myMovies, movies]) => {
        setCurrentUser(user);
        setLoggedIn(true);
        setMyMovies(myMovies);
        setMovies(movies);
      })
      .then(() => setInitializationFinished(true))
      .catch((e) => {
        setInitializationFinished(true);
        setServerIsNotAvailable(true);
        console.log(e);
      });
  }

  async function handleRegister(dataUser) {
    try {
      const user = await MainApi.signUp(dataUser);
      Initialization(user);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async function handleLogIn(dataUser) {
    try {
      const user = await MainApi.signIn(dataUser);
      Initialization(user);
    } catch (err) {
      return Promise.reject(err);
    }
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
      image: movie.image ? API_MOVIES + movie.image.url : EMPTY_LINK,
      trailer: (movie.trailerLink && validator.isURL(movie.trailerLink)) ? movie.trailerLink : EMPTY_LINK,
      thumbnail: movie.image ? API_MOVIES + movie.image.formats.thumbnail.url : EMPTY_LINK,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN ? movie.nameEN : EMPTY_TEXT_FIELD
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
            movies={movies}
            serverIsNotAvailable={serverIsNotAvailable}
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
