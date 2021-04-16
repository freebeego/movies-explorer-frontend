import Nav from './Nav/Nav';
import Header from '../Header/Header';

function Main({ loggedIn }) {
  return (
    <>
      {loggedIn && <Nav />}
      <Header
        loggedIn={loggedIn}
      />
    </>
  );
}

export default Main;
