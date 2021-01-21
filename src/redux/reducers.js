import { combineReducers } from 'redux'

import user from './modules/user/userReducer'
import post from './modules/post/postReducer'

const reducers = combineReducers({
  user,
  post
})

export default reducers