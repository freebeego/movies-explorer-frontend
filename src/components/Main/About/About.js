import './About.css';

function About() {
  return (
    <section className="about">
      <h2 className="about__title about__title_border">
        О проекте
      </h2>
      <ul className="about__flex-container">
        <li className="about__flex-container-item">
          <h3 className="about__title about__title_sub">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="about__flex-container-item">
          <h3 className="about__title about__title_sub">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about__grid">
        <div className="about__grid-item about__grid-item_blue">1 неделя</div>
        <div className="about__grid-item about__grid-item_grey">4 недели</div>
        <div className="about__grid-item about__grid-item_caption">Back-end</div>
        <div className="about__grid-item about__grid-item_caption">Front-end</div>
      </div>
    </section>
  );
}

export default About;
