import Nav from './Nav/Nav';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import About from './About/About';

function Main({ loggedIn }) {
  return (
    <>
      {loggedIn && <Nav />}
      <Header
        loggedIn={loggedIn}
      />
      <Promo />
      <About />
    </>
  );
}

export default Main;
