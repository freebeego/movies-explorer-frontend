import './MoviesCard.css';
import banner from '../../../images/banner.jpg';
import { useLocation } from 'react-router-dom';

function MoviesCard({ filmSaveToggle }) {
  const location = useLocation();

  return (
    <li className="card">
      <img src={ banner } alt="dfgdfgdfg" className="card__image"/>
      <button
        onClick={ filmSaveToggle }
        className={ 'card__button' + (location.pathname === "/saved-movies" ? " card__button_remove" : "") }
      >
        Сохранить
      </button>
      <div className="card__caption">
        <span className="card__name">33 слова о дизайне</span>
        <span className="card__duration">1ч 17м</span>
      </div>
    </li>
  );
}

export default MoviesCard;
