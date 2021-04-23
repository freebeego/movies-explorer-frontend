const queryFilter = (movies, query) => movies.filter((movie) => movie.description.toLowerCase().includes(query));

const shortFilmFilter = (movies) => movies.filter((movie) => movie.duration <= 40);

module.exports = { queryFilter, shortFilmFilter };
