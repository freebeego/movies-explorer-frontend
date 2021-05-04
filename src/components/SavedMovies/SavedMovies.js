import './SavedMovies.css';
import React from 'react';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { queryFilter, shortFilmFilter, filterAfterDelete } from '../../utils/filters';
import { searchError } from '../../utils/constants';

function SavedMovies({ loggedIn, myMovies, handleDeleteMyMovie }) {
  const [query, setQuery] = React.useState(
    localStorage.getItem('my_query') ? localStorage.getItem('my_query') : ''
  );
  const [isShortFilm, setIsShortFilm] = React.useState(
    localStorage.getItem('my_short') ? localStorage.getItem('my_short') === 'true' : false
  );
  const [queryFilteredMovies, setQueryFilteredMovies] = React.useState(
    localStorage.getItem('my_query') ?
      queryFilter(myMovies, localStorage.getItem('my_query').toLowerCase()) : myMovies
  );
  const [shortFilmFilteredMovies, setShortFilmFilteredMovies] = React.useState(
    (
      localStorage.getItem('my_short') === 'true'
    ) ?
      shortFilmFilter(queryFilter(myMovies, (localStorage.getItem('my_query') ?
        localStorage.getItem('my_query').toLowerCase() : ''))) :
      []
  );
  const [shownMovies, setShownMovies] = React.useState( []);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [emptyQuery, setEmptyQuery] = React.useState(false);

  React.useEffect(
    () => {
      setShownMovies(isShortFilm ? shortFilmFilteredMovies : queryFilteredMovies);
    },
    [isShortFilm, queryFilteredMovies, shortFilmFilteredMovies]
  );

  React.useEffect(
    () => {
      if ((!isShortFilm && !queryFilteredMovies.length) || (isShortFilm && !shortFilmFilteredMovies.length)) {
        setErrorMessage(searchError.foundNothing);
      } else {
        setErrorMessage('')
      }
    },
    [isShortFilm, queryFilteredMovies, shortFilmFilteredMovies]
  );

  React.useEffect(
    () => {
      if (!myMovies.length) setErrorMessage(searchError.thereAreNoFilms)
    },
    [myMovies, queryFilteredMovies, shortFilmFilteredMovies, isShortFilm]
  );

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function onDeleteMyMovie(movie) {
    handleDeleteMyMovie(movie)
      .then((deletedMovie) => {
        setQueryFilteredMovies(filterAfterDelete(queryFilteredMovies, deletedMovie));
        setShortFilmFilteredMovies(filterAfterDelete(shortFilmFilteredMovies, deletedMovie));
      })
      .catch((err) => console.log(err));
  }

  function handleSwitchPositionChange() {
    localStorage.setItem('my_short', String(!isShortFilm));
    if (!isShortFilm && !shortFilmFilteredMovies.length && queryFilteredMovies.length) {
      setShortFilmFilteredMovies(shortFilmFilter(queryFilteredMovies));
    }
    setIsShortFilm(!isShortFilm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    localStorage.setItem('my_query', query.trim());
    if (query.trim()) {
      setEmptyQuery(false);
      const filteredMovies = queryFilter(myMovies, query.trim().toLowerCase());
      if (isShortFilm) {
        const shortFilteredMovies = shortFilmFilter(filteredMovies);
        setShortFilmFilteredMovies(shortFilteredMovies);
      } else {
        if (shortFilmFilteredMovies.length) setShortFilmFilteredMovies([]);
      }
      setQueryFilteredMovies(filteredMovies);
    } else {
      setEmptyQuery(true);
      localStorage.setItem('my_query', '');
      setQueryFilteredMovies([]);
      setShortFilmFilteredMovies([]);
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
        <ErrorMessage message={emptyQuery ? searchError.emptyQuery : errorMessage}/>
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
