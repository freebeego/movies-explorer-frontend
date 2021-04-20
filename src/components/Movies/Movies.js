import './Movies.css';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from './More/More';
import Footer from '../Footer/Footer';

function Movies({ loggedIn }) {
  function handleMore() {
    console.log('***');
  }

  return (
    <>
      <Nav />
      <Header loggedIn={loggedIn} />
      <Search />
      <MoviesCardList>
        <More handleMore={handleMore} />
      </MoviesCardList>
      <Footer />
    </>
  );
}

export default Movies;
