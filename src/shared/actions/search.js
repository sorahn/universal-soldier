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

export const fetchSearch = ({ preloaded = false, params }, options) => dispatch => {
  const defaultSearchParams = {
    page_number: 1,
    results_per_page: 24,
  }

  // Spread out the defaults, then spread out the rest of the params.
  const query = objectToQueryString({ ...defaultSearchParams, ...params, })

  // @TODO add redux-promise-middleware
  dispatch(searchPending())
  return fetch(`http://localhost:3000/api/search/v1/list?${query}`, options)
    .then(req => req.json())
    .then(({ Results }) => dispatch(searchSuccess(Results, preloaded)))
}
