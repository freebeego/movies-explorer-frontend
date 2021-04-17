import './Student.css';
import photo from '../../../images/photo.jpg';

function Student() {
  return (
    <section className="student">
      <h2 className="student__title">
        Студент
      </h2>
      <div className="student__flex-wrapper">
        <img src={photo} alt="Фото студента" className="student__photo"/>
        <div className="student__container">
          <p className="student__name">
            Виталий
          </p>
          <p className="student__specialization-age">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="student__about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С&nbsp;2015 года работал в компании «СКБ&nbsp;Контур». После того, как прошёл курс по веб&#8209;разработке,
            начал заниматься фриланс&#8209;заказами&nbsp;и ушёл с постоянной работы.
          </p>
          <div className="student__links">
            <a href="#" className="student__link">Facebook</a>
            <a href="#" className="student__link">Github</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Student;
