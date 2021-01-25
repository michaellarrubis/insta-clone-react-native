import { useSelector, useDispatch } from 'react-redux'
import { getPostsAction } from '../redux/modules/post/postActions'

export const usePost = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.post)

  const _getPosts = () => {
    return dispatch(getPostsAction())
  }
  return {
    posts,

    _getPosts
  }
}