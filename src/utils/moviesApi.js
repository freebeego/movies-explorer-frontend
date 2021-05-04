import { api } from './constants';

export default function getMovies() {
  return fetch(api.movies,{ headers: { 'Accept': 'application/json' } })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(res => Promise.reject(res.message));
    });
}
