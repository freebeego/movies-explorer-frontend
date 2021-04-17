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
        <div className="techs__grid-container">
          <span className="techs__grid-container-item">HTML</span>
          <span className="techs__grid-container-item">CSS</span>
          <span className="techs__grid-container-item">JS</span>
          <span className="techs__grid-container-item">React</span>
          <span className="techs__grid-container-item">Git</span>
          <span className="techs__grid-container-item">Express.js</span>
          <span className="techs__grid-container-item">mongoDB</span>
        </div>
      </div>
    </section>
  );
}

export default Techs;
