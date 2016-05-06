import * as constants from '../constants'

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.RECEIVE_PACKAGE:
      return {
        ...state,
        ...action.json
      }
      return Object.assign({}, state, action.json)
    default:
      return state
  }
}
