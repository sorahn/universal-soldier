import fetch from 'isomorphic-fetch'
import * as constants from '../constants'
import { createAction as action } from 'redux-actions'

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

export const fetchSearch = ({ preloaded = false }) => dispatch => {
  dispatch(searchPending(preloaded))

  return fetch('http://api.naiadsystems.com/search/v1/list?results_per_page=20')
    .then(req => req.json())
    .then(({ Results }) => dispatch(searchSuccess(Results)))
}
