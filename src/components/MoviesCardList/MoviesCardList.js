import './MoviesCardList.css';
import React from 'react';
import MoviesCard from './MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { API_MOVIES } from '../../utils/constants';

const MoviesCardList = React.forwardRef(
  function ({ children, movies, myMovies, handleAddMyMovie, handleDeleteMyMovie }, ref) {
    const location = useLocation();

    function filmSaveToggle(button, id) {
      if (location.pathname === "/saved-movies")  {
        handleDeleteMyMovie(movies.find((movie) => movie._id === id));
      } else {
        if (button.classList.contains('card__button_saved')) {
          handleDeleteMyMovie(myMovies.find((movie) => movie.movieId === id));
          button.classList.remove('card__button_saved');
        } else {
          handleAddMyMovie(movies.find((movie) => movie.id === id))
            .then(() => button.classList.add('card__button_saved'))
            .catch((err) => console.log(err));
        }
      }
    }

    const isMine = (movie) => myMovies.some((myMovie) => myMovie.movieId === movie.id);

    return (
      <section ref={ref} className="movies-cards">
        <ul className="movies-cards-list">
          {movies.map((movie) => {
            return <MoviesCard
              key={location.pathname === "/movies" ? movie.id : movie._id}
              isMine={location.pathname === "/movies" ? isMine(movie) : true}
              id={location.pathname === "/movies" ? movie.id : movie._id}
              filmSaveToggle={filmSaveToggle}
              name={movie.nameRU}
              banner={!movie.image ? '' :
                location.pathname === "/movies" ? API_MOVIES + movie.image.url : movie.image}
              duration={movie.duration}
              trailerLink={location.pathname === "/movies" ? movie.trailerLink : movie.trailer}
            />
          })}
        </ul>
        {children}
      </section>
    );
  }
);

export default MoviesCardList;
