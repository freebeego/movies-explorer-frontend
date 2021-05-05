const queryFilter = (movies, query) => {
  return movies.filter((movie) => {
    if (query.length > 0 && query.length < 3) {
      return movie.nameRU.toLowerCase().includes(query);
    } else {
      return movie.description.toLowerCase().includes(query) || movie.nameRU.toLowerCase().includes(query);
    }
  });
}

const shortFilmFilter = (movies) => movies.filter((movie) => movie.duration <= 40);

const filterAfterDelete = (movies, deletedMovie) => movies.filter((movie) => movie._id !== deletedMovie._id )

module.exports = { queryFilter, shortFilmFilter, filterAfterDelete };
