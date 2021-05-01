import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <span className="not-found__message">Страница не найдена</span>
      <Link to="/" className="not-found__back">Назад</Link>
    </div>
  );
}

export default NotFound;
