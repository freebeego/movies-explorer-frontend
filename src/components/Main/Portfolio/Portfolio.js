import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a href="#" className="portfolio__link">
            Статичный сайт
            <span className="portfolio__link-arrow" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="#" className="portfolio__link">
            Адаптивный сайт
            <span className="portfolio__link-arrow" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a href="#" className="portfolio__link">
            Одностраничное приложение
            <span className="portfolio__link-arrow" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
