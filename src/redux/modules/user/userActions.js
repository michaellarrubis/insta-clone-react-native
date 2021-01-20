import { getUser } from '../../../firebase/actions'
import { USER_STATE_CHANGE } from './userTypes'

export function getUserAction() {
  return (async (dispatch) => {
    const user = await getUser()
    if (user.exists) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: user.data() })
    } else {
      console.log('doesnt exists')
    }
  })
}