import './MoviesCard.css';
import banner from '../../../images/banner.jpg';

function MoviesCard({ filmSaveToggle }) {
  return (
    <li className="card">
      <img src={banner} alt="dfgdfgdfg" className="card__image"/>
      <button onClick={filmSaveToggle} className="card__save" aria-haspopup={true}>Сохранить</button>
      <div className="card__caption">
        <span className="card__name">33 слова о дизайне</span>
        <span className="card__duration">1ч 17м</span>
      </div>
    </li>
  );
}

export default MoviesCard;
