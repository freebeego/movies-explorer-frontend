import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <a href="#" className="portfolio__link">
        Статичный сайт
        <span className="portfolio__link-arrow" />
      </a>
      <a href="#" className="portfolio__link">
        Адаптивный сайт
        <span className="portfolio__link-arrow" />
      </a>
      <a href="#" className="portfolio__link">
        Одностраничное приложение
        <span className="portfolio__link-arrow" />
      </a>
    </section>
  );
}

export default Portfolio;
