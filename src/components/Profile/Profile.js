import './Profile.css';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileFormInput from './ProfileForm/ProfileFormInput/ProfileFormInput';

function Profile({ loggedIn }) {
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
        <ProfileForm>
          <ProfileFormInput
            label="Имя"
            placeholder="Введите имя"
            type="text"
          />
          <ProfileFormInput
            label="E-mail"
            placeholder="Введите email"
            type="email"
          />
        </ProfileForm>
        <button onClick={handleLogout} className="main__button">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
