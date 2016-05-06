import * as constants from '../constants'

const initialState = {
  pending: false,
  results: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_PENDING':
      return {
        ...state,
        pending: true,
      }

    case 'SEARCH_SUCCESS':
      return {
        ...state,
        pending: false,
        results: action.results,
      }

    default: return state
  }
}
