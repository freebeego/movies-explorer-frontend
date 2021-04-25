class Api {
  constructor() {
    this.url = 'https://api.movies.listen-me.ru/';
    /*this.url = 'http://localhost:3003/';*/
  }

  _fetch(path, queryParams = {}) {
    const config = {};
    config.headers = { 'Accept': 'application/json' };
    config.credentials = 'include';
    config.referrerPolicy = "no-cors"
    if (queryParams.method) config.method = queryParams.method;
    if (queryParams.headers) config.headers = { ...config.headers, ...queryParams.headers };
    if (queryParams.body) config.body = JSON.stringify(queryParams.body);

    return fetch(this.url + path, config)
      .then(res => {
        if (res.ok) return res.json();

        return res.json().then(res => Promise.reject(res.message));
      });
  }

  signUp({ name, email, password }) {
    return this._fetch('signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          name,
          email,
          password,
        }
      },
    );
  }

  signIn({ email, password }) {
    return this._fetch('signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          email,
          password,
        }
      },
    );
  }

  signOut() {
    return this._fetch('signout', { method: 'POST' });
  }

  getMyInfo() {
    return this._fetch('users/me');
  }

  editProfile({ name, email }) {
    return this._fetch('users/me',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          name,
          email
        }
      }
    );
  }

  getMyMovies() {
    return this._fetch('movies');
  }

  addMovie(movie) {
    return this._fetch('movies',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: movie
      }
    );
  }

  deleteCard(movieId) {
    return this._fetch(`movies/${ movieId }`,
      {
        method: 'DELETE'
      }
    );
  }
}

const mainApi = new Api();

export default mainApi;
