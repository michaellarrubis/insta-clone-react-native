import { useSelector, useDispatch } from 'react-redux'
import { getUserAction } from '../redux/modules/user/userActions'

export const useUser = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  const _getUser = () => {
    return dispatch(getUserAction())
  }
  return {
    currentUser,

    _getUser
  }
}