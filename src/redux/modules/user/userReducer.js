import { USER_STATE_CHANGE, USER_FOLLOWING, USERS_DATA, USERS_POSTS } from './userTypes'

const initialState = {
  currentUser: null,
  following: [],
  users: [],
  userLoaded: 0
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case USER_FOLLOWING:
      return {
        ...state,
        following: action.following
      }
    case USERS_DATA:
      return {
        ...state,
        users: [...state.users, action.user]
      }
    default:
      return state
  }
}