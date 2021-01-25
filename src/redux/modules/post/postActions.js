import { getPostsByUserId, getCurrentUserId } from '../../../firebase/actions'
import { GET_POSTS } from './postTypes'

export function getPostsAction() {
  return (async (dispatch) => {
    const result = await getPostsByUserId(getCurrentUserId())
    const posts = result.docs.map((doc) => {
      let data = doc.data()
      let id = doc.id
      return { id, ...data }
    })
    dispatch({ type: GET_POSTS, posts })
  })
}