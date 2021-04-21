function getMovies() {
  return this._fetch(
    'https://api.nomoreparties.co/beatfilm-movies',
    {
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    }
  )
    .then(res => {
      if (res.ok) return res.json();

      return res.json().then(res => Promise.reject(res.message));
    });
}

export default getMovies;
