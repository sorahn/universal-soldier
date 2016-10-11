const initialState = {
  pending: false,
  results: [],
  error: false,
}

export default function search(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_PENDING':
      return {
        ...state,
        error: false,
        pending: true,
      }

    case 'SEARCH_FULFILLED':
      return {
        ...state,
        error: false,
        pending: false,
        results: action.payload.Results,
      }

    case 'SEARCH_REJECTED':
      return {
        ...state,
        error: true,
        pending: false,
      }

    default: return state
  }
}
