import { GET_POSTS } from './postTypes'

const initialState = {
  posts: []
}

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}