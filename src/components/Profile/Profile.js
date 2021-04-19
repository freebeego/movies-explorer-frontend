import './Profile.css';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

function Profile({ loggedIn }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleLogout(e) {
    console.log('logout');
  }

  return (
    <>
      { loggedIn && <Nav /> }
      <Header
        loggedIn={loggedIn}
      />
      <section className="main">
        <h1 className="main__title">Привет, Виталий!</h1>
        <form onSubmit={handleSubmit} className="main__form">
          <label className="main__input-label">
            Имя
            <input placeholder="Введите имя" type="text" className="main__input"/>
          </label>
          <label className="main__input-label">
            E-mail
            <input placeholder="Введите email" type="email" className="main__input"/>
          </label>
          <button type="submit" className="main__button  main__button_submit">Редактировать</button>
        </form>
        <button onClick={handleLogout} className="main__button main__button_logout">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
