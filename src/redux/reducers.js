import { combineReducers } from 'redux'

import user from './modules/user/userReducer'

const reducers = combineReducers({
  user
})

export default reducers