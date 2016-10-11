const initialState = {
  searchBoxVisible: false,
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SEARCH':
      return {
        ...state,
        searchBoxVisible: !state.searchBoxVisible,
      }

    default: return state
  }
}
