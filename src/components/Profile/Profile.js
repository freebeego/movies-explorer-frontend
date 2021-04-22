import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileFormInput from './ProfileForm/ProfileFormInput/ProfileFormInput';

function Profile({ loggedIn, handleLogout, handleEditProfile }) {
  const [fieldsData, setFieldsData] = React.useState({ name: '', email: '' });
  const [fieldsError, setFieldsError] = React.useState({ name: false, email: false });
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setFieldsData(currentUser);
  }, [currentUser]);

  React.useEffect(() => {
    if (fieldsError.name || fieldsError.email || fieldsData.name === '' || fieldsData.email === '') {
      setIsSubmitButtonActive(false);
    }
    else {
      setIsSubmitButtonActive(true);
    }
  }, [fieldsError, fieldsData]);

  function handleSubmit(e) {
    e.preventDefault();
    handleEditProfile(fieldsData)
      .then(() => {
        setServerError(false);
        setServerErrorMessage('');
      })
      .catch((err) => {
        setServerErrorMessage(err);
        setServerError(true);
      });
  }

  function handleChange(e) {
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target.value
    });

    setFieldsError({
      ...fieldsError,
      [e.target.name]: !e.target.validity.valid
    });
  }

  return (
    <>
      { loggedIn && <Nav /> }
      <Header
        loggedIn={loggedIn}
      />
      <section className="main">
        <h1 className="main__title">{`Привет, ${currentUser.name}!`}</h1>
        <ProfileForm
          handleSubmit={handleSubmit}
          submitButtonText="Редактировать"
          isSubmitButtonActive={ isSubmitButtonActive }
          serverError={ serverError }
          serverErrorMessage={ serverErrorMessage }
        >
          <ProfileFormInput
            name="name"
            label="Имя"
            placeholder="Введите имя"
            type="text"
            value={fieldsData.name}
            onChange={handleChange}
            isRequired={true}
            validError={fieldsError.name}
            maxLength={30}
            pattern="(.*(?<=\s*)[a-zA-Zа-яА-ЯёЁ\-]+.*(?=\s*)){2,30}"
            errorMessage="Некорректное имя."
          />
          <ProfileFormInput
            name="email"
            label="E-mail"
            placeholder="Введите e-mail"
            type="email"
            value={fieldsData.email}
            onChange={handleChange}
            isRequired={true}
            validError={fieldsError.email}
            maxLength={50}
            errorMessage="Некорректный email."
          />
        </ProfileForm>
        <button onClick={handleLogout} className="main__button">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;
