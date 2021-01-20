const initialState = {
  currentUser: null
}

export default function userReducer(state = initialState, action) {
  return {
    ...state,
    currentUser: action.currentUser
  }
}