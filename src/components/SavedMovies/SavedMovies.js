import './SavedMovies.css';
import React from 'react';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { queryFilter, shortFilmFilter } from '../../utils/filters';

function SavedMovies({ loggedIn, myMovies, handleDeleteMyMovie }) {
  const [query, setQuery] = React.useState(
    localStorage.getItem('my_query') ? localStorage.getItem('my_query') : ''
  );
  const [isShortFilm, setIsShortFilm] = React.useState(
    localStorage.getItem('my_short') ? localStorage.getItem('my_short') === 'true' : false
  );
  const [queryFilteredMovies, setQueryFilteredMovies] = React.useState(
    localStorage.getItem('my_query') ?
      queryFilter(myMovies, localStorage.getItem('my_query').toLowerCase()) : []
  );
  const [shortFilmFilteredMovies, setShortFilmFilteredMovies] = React.useState(
    (
      localStorage.getItem('my_query') &&
      localStorage.getItem('my_short') &&
      localStorage.getItem('my_short') === 'true'
    ) ? shortFilmFilter(queryFilter(myMovies, localStorage.getItem('my_query').toLowerCase())) : []
  );
  const [shownMovies, setShownMovies] = React.useState(
    (
    localStorage.getItem('my_query') &&
    localStorage.getItem('my_short') &&
    localStorage.getItem('my_short') === 'true'
    ) ? shortFilmFilter(queryFilter(myMovies, localStorage.getItem('my_query').toLowerCase())) :
      localStorage.getItem('my_query') ?
        queryFilter(myMovies, localStorage.getItem('my_query').toLowerCase()) : myMovies
  );
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(
    () => {
      setShownMovies(isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies);
    },
    [isShortFilm, queryFilteredMovies, shortFilmFilteredMovies]
  );

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

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function onDeleteMyMovie(movie) {
    handleDeleteMyMovie(movie)
      .then(() => {
        setQueryFilteredMovies([]);
        setShortFilmFilteredMovies([]);
      })
      .catch((err) => console.log(err));
  }

  function handleSwitchPositionChange() {
    localStorage.setItem('my_short', String(!isShortFilm));
    if (!isShortFilm && !shortFilmFilteredMovies.length && queryFilteredMovies.length) {
      console.log('***')
      setShortFilmFilteredMovies(shortFilmFilter(queryFilteredMovies));
    }
    setIsShortFilm(!isShortFilm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem('my_query', query.trim());
    if (query.trim()) {
      const filteredMovies = queryFilter(myMovies, query.trim().toLowerCase());
      if (!filteredMovies.length) {
        setErrorMessage('По вашему запросу ничего не найдено.')
      } else {
        setQueryFilteredMovies(filteredMovies);
        if (isShortFilm) {
          const shortFilteredMovies = shortFilmFilter(queryFilteredMovies);
          if (shortFilteredMovies) {
            setShortFilmFilteredMovies(shortFilteredMovies);
          } else {
            setErrorMessage('По вашему запросу ничего не найдено.')
          }
        } else {
          setShortFilmFilteredMovies([]);
        }
      }
    } else {
      setErrorMessage('Пустой запрос.');
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
        <MoviesCardList
          movies={shownMovies}
          handleDeleteMyMovie={onDeleteMyMovie}
        />
      }
      <Footer />
    </>
  );
}

export default SavedMovies;
