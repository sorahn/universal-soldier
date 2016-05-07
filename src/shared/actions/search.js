import fetch from 'isomorphic-fetch'
import * as constants from '../constants'
import { createAction as action } from 'redux-actions'

// take an object, and reduce it to a query string for sending GET params.
export const objectToQueryString = (object = {}) => {
  return Object.keys(object).reduce((previous, key) => {
    return [...previous, key + '=' + encodeURIComponent(object[key])]
  }, []).join('&')
}

export const clearPreloadedFlag = () => ({
  type: 'CLEAR_SEARCH_PRELOADED_FLAG'
})

export const searchPending = (preloaded) => ({
  type: 'SEARCH_PENDING',
  preloaded,
})

export const searchSuccess = (results) => ({
  type: 'SEARCH_SUCCESS',
  results,
})

export const fetchSearch = ({ preloaded = false, params }) => dispatch => {
  dispatch(searchPending(preloaded))

  const query = objectToQueryString({
    ...params,
    page_number: params.page_number || 1,
  })

  return fetch(`http://localhost:3000/api/search/v1/list?results_per_page=24&${query}`)
    .then(req => req.json())
    .then(({ Results }) => dispatch(searchSuccess(Results)))
}
