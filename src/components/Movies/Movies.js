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
import { queryFilter, shortFilmFilter } from '../../utils/filters';
import { SERVERS_IS_NOT_AVAILABLE, FOUND_NOTHING, EMPTY_QUERY } from '../../config/constants';

function Movies({ loggedIn, myMovies, handleAddMyMovie, handleDeleteMyMovie, movies, serverIsNotAvailable }) {
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

  const MoviesCardListRef = React.useRef();

  React.useEffect(
    () => {
      if (serverIsNotAvailable) setErrorMessage(SERVERS_IS_NOT_AVAILABLE);
    },
    [serverIsNotAvailable]
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
      const filteredMovies = queryFilter(movies, query.trim().toLowerCase());
      if (!filteredMovies.length) {
        setErrorMessage(FOUND_NOTHING);
        setQueryFilteredMovies([]);
      } else {
        if (isShortFilm) {
          const shortFilteredMovies = shortFilmFilter(filteredMovies);
          if (!shortFilteredMovies.length) {
            setErrorMessage(FOUND_NOTHING);
            setShortFilmFilteredMovies([]);
          } else {
            setShortFilmFilteredMovies(shortFilteredMovies);
          }
        } else {
          if (shortFilmFilteredMovies.length) setShortFilmFilteredMovies([]);
        }
        setQueryFilteredMovies(filteredMovies);
      }
      setPreloaderShown(false);
    } else {
      setErrorMessage(EMPTY_QUERY);
      localStorage.setItem('query', '');
      setQueryFilteredMovies([]);
      setShortFilmFilteredMovies([]);
    }
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleSwitchPositionChange() {
    if (!query.trim()) {
      setErrorMessage(EMPTY_QUERY);
    } else {
      localStorage.setItem('short', String(!isShortFilm));
      if (!isShortFilm && !shortFilmFilteredMovies.length) {
        const shortFilmFilterMovies = shortFilmFilter(queryFilteredMovies);
        if (shortFilmFilterMovies.length) {
          setShortFilmFilteredMovies(shortFilmFilterMovies);
        } else {
          setErrorMessage(FOUND_NOTHING);
        }
      } else {
        if (queryFilteredMovies.length) setErrorMessage('');

      }
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
        <ErrorMessage message={errorMessage} />
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
