import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import About from './About/About';
import Techs from './Techs/Techs';
import Student from './Student/Student';

function Main({ loggedIn }) {
  return (
    <>
      {loggedIn && <Nav />}
      <Header
        loggedIn={loggedIn}
      />
      <Promo />
      <About />
      <Techs />
      <Student />
    </>
  );
}

export default Main;
