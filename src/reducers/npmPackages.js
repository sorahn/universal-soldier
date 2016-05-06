import * as constants from '../constants'

const initialState = []

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case constants.RECEIVE_PACKAGES:
      return {
        ...state,
        packages: action.json.rows.map(
          ({key: [ignore, name, description]}, id) => ({
            id, name, description
          })
        )
      }

    default: return state
  }
}
