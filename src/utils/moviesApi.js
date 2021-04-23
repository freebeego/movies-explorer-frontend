export default function getMovies() {
  return fetch(
    'https://api.nomoreparties.co/beatfilm-movies',
    {
      headers: { 'Accept': 'application/json' }
    }
  )
    .then(res => {
      if (res.ok) return res.json();

      return res.json().then(res => Promise.reject(res.message));
    });
}
