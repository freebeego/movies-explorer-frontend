import './MoviesCardList.css';
import React from 'react';
import MoviesCard from './MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

const MoviesCardList = React.forwardRef(
  function ({ children, movies, myMovies, handleAddMyMovie, handleDeleteMyMovie }, ref) {
    const location = useLocation();

    function filmSaveToggle(button, id) {
      if (location.pathname === "/saved-movies")  {
        console.log('saved movies');
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
              key={movie.id}
              isMine={isMine(movie)}
              id={movie.id}
              filmSaveToggle={filmSaveToggle}
              name={movie.nameRU}
              banner={movie.image ? 'https://api.nomoreparties.co' + movie.image.url : ''}
              duration={movie.duration}
              trailerLink={movie.trailerLink}
            />
          })}
        </ul>
        {children}
      </section>
    );
  }
);

export default MoviesCardList;
