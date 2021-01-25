import { getUserById, getCurrentUserId, getUserFollowingByUserId } from '../../../firebase/actions'
import { USER_STATE_CHANGE, USER_FOLLOWING } from './userTypes'

export function getUserAction() {
  return (async (dispatch) => {
    const user = await getUserById(getCurrentUserId())
    if (user.exists) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: user.data() })
    } else {
      console.log('doesnt exists')
    }
  })
}

export function getUserFollowingAction() {
  return (async (dispatch) => {
    const result = await getUserFollowingByUserId(getCurrentUserId())
    const following = result.docs.map((doc) => {
      return doc.id
    })
    dispatch({ type: USER_FOLLOWING, following })
  })
}