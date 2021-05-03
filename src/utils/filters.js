const queryFilter = (movies, query) =>
  movies.filter((movie) =>
    movie.description.toLowerCase().includes(query) || movie.nameRU.toLowerCase().includes(query));

const shortFilmFilter = (movies) => movies.filter((movie) => movie.duration <= 40);

const filterAfterDelete = (movies, deletedMovie) => movies.filter((movie) => movie._id !== deletedMovie._id )

module.exports = { queryFilter, shortFilmFilter, filterAfterDelete };
