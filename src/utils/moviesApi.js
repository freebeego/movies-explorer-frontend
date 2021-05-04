import { API_MOVIES } from './constants';

export default function getMovies() {
  return fetch(API_MOVIES,{ headers: { 'Accept': 'application/json' } })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(res => Promise.reject(res.message));
    });
}
