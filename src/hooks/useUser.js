import { useSelector, useDispatch } from 'react-redux'
import { getUserAction, getUserFollowingAction } from '../redux/modules/user/userActions'

export const useUser = () => {
  const dispatch = useDispatch()
  const { currentUser, following } = useSelector((state) => state.user)

  const _getUser = () => {
    return dispatch(getUserAction())
  }

  const _getUserFollowing = () => {
    return dispatch(getUserFollowingAction())
  }
  return {
    currentUser,
    following,

    _getUser,
    _getUserFollowing
  }
}