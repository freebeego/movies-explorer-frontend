import './Movies.css';
import React from 'react';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Preloader from '../Preloader/Preloader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from './More/More';
import Footer from '../Footer/Footer';
import getMovies from '../../utils/moviesApi';
import { queryFilter, shortFilmFilter } from '../../utils/filters';

function Movies({ loggedIn }) {
  const [query, setQuery] = React.useState(
    localStorage.getItem('query') ? localStorage.getItem('query') : ''
  );
  const [queryFilteredMovies, setQueryFilteredMovies] = React.useState(
    localStorage.getItem('filteredMovies') ? JSON.parse(localStorage.getItem('filteredMovies')) : []
  );
  const [isShortFilm, setIsShortFilm] = React.useState(
    localStorage.getItem('short') ? localStorage.getItem('short') === 'true' : false
  );
  const [shortFilmFilteredMovies, setShortFilmFilteredMovies] = React.useState(
    (localStorage.getItem('short') && localStorage.getItem('short') === 'true' &&
      localStorage.getItem('filteredMovies')) ?
      shortFilmFilter(JSON.parse(localStorage.getItem('filteredMovies'))) : []
  );
  const [shownMovies, setShownMovies] = React.useState([]);
  const [preloaderShown, setPreloaderShown] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(
    () => {
      localStorage.setItem('query', query.trim());
    },
    [query]
  );

  React.useEffect(
    () => {
    localStorage.setItem('filteredMovies', JSON.stringify(queryFilteredMovies));
  },
    [queryFilteredMovies]);

  React.useEffect(
    () => {
      if (document.documentElement.clientWidth >= 1137) {
        setShownMovies((isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies).slice(0, 12));
      } else if (document.documentElement.clientWidth >= 656) {
        setShownMovies((isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies).slice(0, 8));
      } else {
        setShownMovies((isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies).slice(0, 5));
      }
    },
    [isShortFilm, queryFilteredMovies, shortFilmFilteredMovies]
  );

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    if (query.trim()) {
      setPreloaderShown(true);
      getMovies()
        .then((movies) => {
          const filteredMovies = queryFilter(movies, query.trim().toLowerCase());
          if (!filteredMovies.length) {
            setErrorMessage('По вашему запросу ничего не найдено.');
          } else {
            if (isShortFilm) {
              setShortFilmFilteredMovies(shortFilmFilter(filteredMovies));
            } else {
              if (shortFilmFilteredMovies.length) setShortFilmFilteredMovies([]);
            }
            setQueryFilteredMovies(filteredMovies);
            setPreloaderShown(false);
          }
        })
        .catch((err) => {
          setPreloaderShown(false);
          setErrorMessage('Сервер не ответил на запрос. Попробуйте пожалуйста чуть позже.');
        });
    } else {
      console.log('***')
      setErrorMessage('Пустой запрос.');
    }
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleSwitchPositionChange() {
    localStorage.setItem('short', String(!isShortFilm));
    if (!isShortFilm && !shortFilmFilteredMovies.length) {
      setShortFilmFilteredMovies(shortFilmFilter(queryFilteredMovies));
    }
    setIsShortFilm(!isShortFilm);
  }

  function handleMore() {
    if (document.documentElement.clientWidth >= 1137) {
      setShownMovies(
        (isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies).slice(0, shownMovies.length + 3)
      );
    } else {
      setShownMovies(
        (isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies).slice(0, shownMovies.length + 2)
      );
    }
  }

  return (
    <>
      <Nav />
      <Header loggedIn={loggedIn} />
      <Search
        handleSubmit={handleSubmit}
        query={query}
        handleChange={handleQueryChange}
        isShortFilm={isShortFilm}
        handleSwitchPositionChange={handleSwitchPositionChange}
      />
      {errorMessage ?
        <ErrorMessage message={errorMessage}/>
        :
        <MoviesCardList movies={preloaderShown ? [] : shownMovies}>
          {preloaderShown && <Preloader/>}
          {
            !preloaderShown && shownMovies.length < (isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies).length
            && <More handleMore={handleMore} />
          }
        </MoviesCardList>
      }
      <Footer />
    </>
  );
}

export default Movies;
