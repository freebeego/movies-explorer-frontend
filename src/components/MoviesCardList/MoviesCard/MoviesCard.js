import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ filmSaveToggle, banner, name, duration, trailerLink }) {
  const location = useLocation();

  function durationFormatter(duration) {
    let result ='';
    if (duration >= 60) {
      result += `${(duration - duration % 60) / 60}ч `;
    }
    result += duration % 60 ? `${duration % 60}м` : '';
    return result;
  }

  return (
    <li className="card">
      <a href={trailerLink} target="_blank" rel="noreferrer" className="card__link">
        <img src={ banner } alt={name} className="card__image"/>
      </a>
      <button
        onClick={ filmSaveToggle }
        className={ 'card__button' + (location.pathname === "/saved-movies" ? " card__button_remove" : "") }
      >
        Сохранить
      </button>
      <div className="card__caption">
        <span className="card__name">{name}</span>
        <span className="card__duration">
          {durationFormatter(duration)}
        </span>
      </div>
    </li>
  );
}

export default MoviesCard;
