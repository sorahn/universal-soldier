// take an object, and reduce it to a query string for sending GET params.
export const objectToQueryString = (object = {}) => {
  return Object.keys(object).reduce((previous, key) => {
    return [...previous, key + '=' + encodeURIComponent(object[key])]
  }, []).join('&')
}

export const fetchSearch = (params, options) => dispatch => {
  const {
    page_number = 1,
    results_per_page = 24,
    ...rest
  } = params

  // Spread out the defaults, then spread out the rest of the params.
  const query = objectToQueryString({ page_number, results_per_page, ...rest })

  return dispatch({
    type: 'SEARCH',
    $payload: {
      url: `http://localhost:8181/api/search/v1/list?${query}`,
    }
  })
}
