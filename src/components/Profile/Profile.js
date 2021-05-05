import './Profile.css';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import ProfileForm from './ProfileForm/ProfileForm';
import ProfileFormInput from './ProfileForm/ProfileFormInput/ProfileFormInput';
import useFormWithValidation from '../Ident/FormValidationHook/useFormWithValidation';

function Profile({ loggedIn, handleLogout, handleEditProfile }) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    fieldsData,
    fieldsError,
    isSubmitButtonActive,
    isThereServerMessage,
    serverMessage,
    handleChange,
    handleSubmit,
    setFieldsData,
    setIsSubmitButtonActive,
    isSubmitResultOk
  } = useFormWithValidation(
    { name: '', email: '', password: '' },
    handleEditProfile
  );

  React.useEffect(() => {
    setFieldsData(currentUser);
  }, [currentUser, setFieldsData]);

  React.useEffect(() => {
    if (
      fieldsError.name || fieldsError.email ||
      fieldsData.name === '' || fieldsData.email === '' ||
      (fieldsData.name.trim() === currentUser.name && fieldsData.email.trim() === currentUser.email)
    ) {
      setIsSubmitButtonActive(false);
    }
    else {
      setIsSubmitButtonActive(true);
    }
  }, [fieldsError, fieldsData, currentUser, setIsSubmitButtonActive]);

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
          isThereServerMessage={ isThereServerMessage }
          serverMessage={ serverMessage }
          isSubmitResultOk={isSubmitResultOk}
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
