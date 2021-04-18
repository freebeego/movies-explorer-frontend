import './Movies.css';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from './Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ loggedIn }) {
  return (
    <>
      <Nav />
      <Header loggedIn={loggedIn} />
      <Search />
      <MoviesCardList />
    </>
  );
}

export default Movies;
