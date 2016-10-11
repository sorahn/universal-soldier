import fetch from 'isomorphic-fetch'

export default function fetchWrapper (url, options) {
  return fetch(url, options)
    .then(r => r.json())
    .catch(e => Promise.reject(e))
}
