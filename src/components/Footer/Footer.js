import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <ul className="footer__list">
          <li className="footer__list-item">
            <a href="" className="footer__link">Яндекс.Практикум</a>
          </li>
          <li className="footer__list-item">
            <a href="" className="footer__link">Github</a>
          </li>
          <li className="footer__list-item">
            <a href="" className="footer__link">Facebook</a>
          </li>
        </ul>
        <p className="footer__copyright">&copy;2021</p>
      </div>
    </footer>
  );
}

export default Footer;
