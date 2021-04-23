import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ movies, children }) {
  const location = useLocation();

  function filmSaveToggle(e) {
    if (location.pathname === "/saved-movies")  {
      console.log('saved movies');
    } else {
      e.target.classList.toggle('card__button_saved');
    }
  }
  return (
    <section className="movies-cards">
      <ul className="movies-cards-list">
        {movies.map((movie) => {

          return <MoviesCard
            key={movie.id}
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

export default MoviesCardList;
