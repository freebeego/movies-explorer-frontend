import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ cards, children }) {
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
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
