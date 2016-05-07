import fetch from 'isomorphic-fetch'
import * as constants from '../constants'
import { createAction as action } from 'redux-actions'

export const clearPreloadFlag = () => ({
  type: 'CLEAR_SEARCH_PRELOAD_FLAG'
})

export const fetchSearch = ({preload}) => dispatch => {
  dispatch({
    type: 'SEARCH_PENDING',
    preload
  })

  return fetch('http://api.naiadsystems.com/search/v1/list?results_per_page=20')
    .then(req => req.json())
    .then(({ Results }) => dispatch({
      type: 'SEARCH_SUCCESS',
      results: Results,
    }))
}
