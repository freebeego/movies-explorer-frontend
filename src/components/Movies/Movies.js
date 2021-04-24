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

function Movies({ loggedIn, myMovies, handleAddMyMovie, handleDeleteMyMovie }) {
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
  const [moreDidClick, setMoreDidClick] = React.useState(false);
  const [emptyQuery, setEmptyQuery] = React.useState(false);

  const MoviesCardListRef = React.useRef();

  React.useEffect(
    () => {
    localStorage.setItem('filteredMovies', JSON.stringify(queryFilteredMovies));
  },
    [queryFilteredMovies]);

  React.useEffect(
    () => {
      if ((!isShortFilm && !queryFilteredMovies.length) || (isShortFilm && !shortFilmFilteredMovies.length)) {
        setErrorMessage('По вашему запросу ничего не найдено.');
      } else {
        setErrorMessage('')
      }
    },
    [isShortFilm, queryFilteredMovies, shortFilmFilteredMovies]
  );

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

  React.useEffect(
    () => {
      if (moreDidClick) {
        MoviesCardListRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
        setMoreDidClick(false);
      }
    },
    [shownMovies, moreDidClick]
  );

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    localStorage.setItem('query', query.trim());
    if (query.trim()) {
      setPreloaderShown(true);
      setEmptyQuery(false);
      getMovies()
        .then((movies) => {
          const filteredMovies = queryFilter(movies, query.trim().toLowerCase());
            if (isShortFilm) {
              const shortFilteredMovies = shortFilmFilter(filteredMovies);
                setShortFilmFilteredMovies(shortFilteredMovies);
            } else {
              if (shortFilmFilteredMovies.length) setShortFilmFilteredMovies([]);
            }
          setQueryFilteredMovies(filteredMovies);
          setPreloaderShown(false);
        })
        .catch(() => {
          setPreloaderShown(false);
          setErrorMessage('Сервер не ответил на запрос. Попробуйте пожалуйста чуть позже.');
        });
    } else {
      setEmptyQuery(true);
      localStorage.setItem('query', '');
      setQueryFilteredMovies([]);
      setShortFilmFilteredMovies([]);
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
    setMoreDidClick(true);
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
        <ErrorMessage message={emptyQuery ? 'Пустой запрос.' : errorMessage} />
        :
        <MoviesCardList
          handleAddMyMovie={handleAddMyMovie}
          handleDeleteMyMovie={handleDeleteMyMovie}
          myMovies={myMovies}
          movies={preloaderShown ? [] : shownMovies}
          ref={MoviesCardListRef}
        >
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
