import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';

function MoviesCardList({ cards, children }) {
  function filmSaveToggle(e) {
    e.target.classList.toggle('card__save_saved');
  }

  return (
    <section className="movies-cards">
      <ul className="movies-cards-list">
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
        <MoviesCard filmSaveToggle={filmSaveToggle} />
      </ul>
      {children}
    </section>
  );
}

export default MoviesCardList;
