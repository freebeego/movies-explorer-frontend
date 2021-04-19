import './SavedMovies.css';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from '../Movies/Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn }) {
  return (
    <>
      <Nav />
      <Header loggedIn={loggedIn} />
      <Search />
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default SavedMovies;
