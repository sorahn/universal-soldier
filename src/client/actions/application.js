export const toggleSearchBox = e => (dispatch, getState) => {
  e.preventDefault()

  const { searchBoxVisible } = getState().application
  const { scrollY, scrollTo } = window

  if (searchBoxVisible && scrollY > 0) {
    scrollTo(0, 0)
    return
  }

  if (!searchBoxVisible) {
    scrollTo(0, 0)
  }

  return dispatch({ type: 'TOGGLE_SEARCH' })
}
