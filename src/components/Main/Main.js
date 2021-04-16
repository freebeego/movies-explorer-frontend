import Nav from './Nav/Nav';
import Header from '../Header/Header';
import Promo from './Promo/Promo';

function Main({ loggedIn }) {
  return (
    <>
      {loggedIn && <Nav />}
      <Header
        loggedIn={loggedIn}
      />
      <Promo />
    </>
  );
}

export default Main;
