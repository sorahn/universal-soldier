import fetch from 'isomorphic-fetch'
import * as constants from '../constants'
import { createAction as action } from 'redux-actions'

export const fetchSearch = () => dispatch => {
  dispatch({type: 'SEARCH_PENDING'})

  return fetch('http://api.naiadsystems.com/search/v1/list?results_per_page=20')
    .then(req => req.json())
    .then(({ Results }) => dispatch({
      type: 'SEARCH_SUCCESS',
      results: Results,
    }))
}
