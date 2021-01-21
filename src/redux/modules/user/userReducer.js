import { USER_STATE_CHANGE } from './userTypes'

const initialState = {
  currentUser: null
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    default:
      return state
  }
}