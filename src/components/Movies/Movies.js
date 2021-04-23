import './Movies.css';
import React from 'react';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from '../Search/Search';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from './More/More';
import Footer from '../Footer/Footer';
import getMovies from '../../utils/moviesApi';

function Movies({ loggedIn }) {
  const [query, setQuery] = React.useState('');
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [preloaderShown, setPreloaderShown] = React.useState(false);
  const [isShortFilm, setIsShortFilm] = React.useState(false);

  React.useEffect(() => {

  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (query.trim()) {
      setPreloaderShown(true);

      getMovies()
        .then((movies) => {
          const filteredMovies = movies.filter(
            (movie) => movie.description.toLowerCase().includes(query.trim().toLowerCase())
          );

          localStorage.setItem('query', query.trim());
          localStorage.setItem('movies', JSON.stringify(filteredMovies));

          setPreloaderShown(false);
          if (document.documentElement.clientWidth >= 1137) {
            setMovies(filteredMovies.slice(0, 12));
          } else if (document.documentElement.clientWidth >= 656) {
            setMovies(filteredMovies.slice(0, 8));
          } else {
            setMovies(filteredMovies.slice(0, 5));
          }
          setFilteredMovies(filteredMovies);
        })
        .catch((err) => {
          setPreloaderShown(false);
        });
    } else {

    }

    setQuery('');
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleSwitchPositionChange(e) {
    setIsShortFilm(!isShortFilm);
    localStorage.setItem('short', String(isShortFilm));
  }

  function handleMore() {
    if (document.documentElement.clientWidth >= 1280) {
      setMovies(filteredMovies.slice(0, movies.length + 3));
    } else {
      setMovies(filteredMovies.slice(0, movies.length + 2));
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
      <MoviesCardList movies={isShortFilm ? movies.filter((movie) => movie.duration <= 40) : movies}>
        {preloaderShown && <Preloader/>}
        <More handleMore={handleMore} visible={movies.length < filteredMovies.length} />
      </MoviesCardList>
      <Footer />
    </>
  );
}

export default Movies;
