import './NotFound.css';
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  function handleBack() {
    history.goBack();
  }

  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <span className="not-found__message">Страница не найдена</span>
      <button onClick={handleBack} className="not-found__back">Назад</button>
    </div>
  );
}

export default NotFound;
