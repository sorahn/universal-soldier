import $fetch from 'isomorphic-fetch'
// import winston from 'winston'

// take an object, and reduce it to a query string for sending GET params.
export const objectToQueryString = (object = {}) => {
  return Object.keys(object).reduce((previous, key) => {
    return [...previous, key + '=' + encodeURIComponent(object[key])]
  }, []).join('&')
}

// Check that the response itself is flagged as 'good' from the server.
export const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(
      `icf-fetch: checkStatus:
      Error for "${response.url}:
      Status: ${response.status} ${response.statusText}`
    )

    error.response = response
    // winston.error(error)
    throw error
  }
}

// Parse the response json.
export const parseJSON = response => {
  return response.json().then(json => json)
    .catch(err => {
      const error = new Error(
        `ifc-fetch: parseJSON:
        Response is probably not JSON
        error: ${err}`
      )

      error.response = response
      error.err = err
      // winston.error(error)
      throw error
    })
}

// Check that the response has 'SM_OK' from the naiadsystems api
export const checkSMOK = json => {
  // Only test of SM_OK is true if the key exists.
  if (!json.status) {
    return json
  }

  if (json.status !== 'SM_ERROR') {
    return json
  } else {
    const error = new Error(
      `icf-fetch: checkSMOK:
      RequestKey: ${json.requestkey}
      Status: ${json.status}`
    )

    error.json = json
    // winston.error(error)
    throw error
  }
}

export const checkRequest = response => {
  return Promise.resolve(response)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkSMOK)
}

export const get = (url, data, options = {}) => {
  return $fetch(url + '?' + objectToQueryString(data), options)
    .then(checkRequest)
}

const POST_CONFIG = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'post',
  timeout: 5000,
}

export const post = (url, data, config = POST_CONFIG) => {
  return $fetch(url, { ...config, body: JSON.stringify(data) })
    .then(checkRequest)
}
