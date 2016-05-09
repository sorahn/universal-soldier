import * as constants from '../constants'

const initialState = {
  preloaded: false,
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
        preloaded: action.preloaded,
        results: action.results,
      }

    case 'CLEAR_SEARCH_PRELOADED_FLAG':
      return {
        ...state,
        preloaded: false
      }

    default: return state
  }
}
