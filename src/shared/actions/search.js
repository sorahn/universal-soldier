import fetch from 'isomorphic-fetch'
import * as constants from '../constants'

// take an object, and reduce it to a query string for sending GET params.
export const objectToQueryString = (object = {}) => {
  return Object.keys(object).reduce((previous, key) => {
    return [...previous, key + '=' + encodeURIComponent(object[key])]
  }, []).join('&')
}

export const clearPreloadedFlag = () => ({
  type: 'CLEAR_SEARCH_PRELOADED_FLAG'
})

export const searchPending = () => ({
  type: 'SEARCH_PENDING'
})

export const searchSuccess = (results, preloaded) => ({
  type: 'SEARCH_SUCCESS',
  results,
  preloaded,
})

export const fetchSearch = ({ preloaded = false, params }, options = {}) => dispatch => {
  dispatch(searchPending())

  const query = objectToQueryString({
    results_per_page: 24,
    ...params,
    page_number: params.page_number || 1,
  })

  return fetch(`http://localhost:3000/api/search/v1/list?${query}`, options)
    .then(req => req.json())
    .then(({ Results }) => dispatch(searchSuccess(Results, preloaded)))
}
