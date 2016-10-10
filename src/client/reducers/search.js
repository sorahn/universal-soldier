const initialState = {
  pending: false,
  results: [],
}

export default function search(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return {
        ...state,
        pending: true,
      }

    case 'SEARCH_SUCCESS':
      return {
        ...state,
        pending: false,
        results: action.data.Results,
      }

    default: return state
  }
}
