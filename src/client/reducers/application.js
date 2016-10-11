const initialState = {
  searchBarVisible: false,
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        searchBarVisible: !state.searchBarVisible,
      }

    default: return state
  }
}
