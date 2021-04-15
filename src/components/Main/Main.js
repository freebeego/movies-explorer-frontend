import Header from '../Header/Header';

function Main({ loggedIn }) {
  return (
    <>
      <Header
        loggedIn={loggedIn}
      />
    </>
  );
}

export default Main;
