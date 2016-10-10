const initialState = {
  pending: false,
  results: [],
}

export default function search(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_PENDING':
      return {
        ...state,
        pending: true,
      }

    case 'SEARCH_FULFILLED':
      return {
        ...state,
        pending: false,
        results: action.payload.Results,
      }

    default: return state
  }
}
