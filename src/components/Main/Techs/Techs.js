import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title techs__title_border">
        Технологии
      </h2>
      <h3 className="techs__subtitle">
        7 технологий
      </h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <div className="techs__grid-container-wrapper">
        <ul className="techs__grid-container">
          <li className="techs__grid-container-item">HTML</li>
          <li className="techs__grid-container-item">CSS</li>
          <li className="techs__grid-container-item">JS</li>
          <li className="techs__grid-container-item">React</li>
          <li className="techs__grid-container-item">Git</li>
          <li className="techs__grid-container-item">Express.js</li>
          <li className="techs__grid-container-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
