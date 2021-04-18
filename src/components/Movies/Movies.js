import './Movies.css';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from './Search/Search';

function Movies({ loggedIn }) {
  return (
    <>
      <Nav />
      <Header loggedIn={loggedIn} />
      <Search />
    </>
  );
}

export default Movies;
