const api = {
  main: 'https://api.movies.listen-me.ru/',
  movies: 'https://api.nomoreparties.co/'
};

const emptyLink = 'https://www.empty.com';

const emptyTextField = 'empty';

const searchError = {
  foundNothing: 'По вашему запросу ничего не найдено.',
  serverIsNotAvailable: 'Сервер временно не доступен',
  emptyQuery: 'Пустой запрос.',
  thereAreNoFilms: 'Вы еще не сохранили ни одного фильма'
};

const ProfileSucceedMessage = 'Данные профиля успешно обновлены.';

module.exports = {
  api, emptyLink, emptyTextField, searchError, ProfileSucceedMessage
};
