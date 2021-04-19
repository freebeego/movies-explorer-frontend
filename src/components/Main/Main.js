import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import About from './About/About';
import Techs from './Techs/Techs';
import Student from './Student/Student';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main({ loggedIn }) {
  return (
    <>
      { loggedIn && <Nav /> }
      <Header
        loggedIn={loggedIn}
      />
      <Promo />
      <About />
      <Techs />
      <Student />
      <Portfolio />
      <Footer />
    </>
  );
}

export default Main;
