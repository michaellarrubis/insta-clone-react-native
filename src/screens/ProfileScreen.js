import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'

import { useUser } from '../hooks/useUser'
import { usePost } from '../hooks/usePost'

import { getCurrentUserId, getUserById, getPostsByUserId } from '../firebase/actions'

const ProfileScreen = ({ route, navigation }) => {
  const { currentUser } = useUser()
  const { posts, _getPosts } = usePost()
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (route.params?.uid === getCurrentUserId().uid) {
      setUser(currentUser)
      setUserPosts(posts)
    } else {
      handleGetUserById(route.params?.uid)
      handleGetPostsByUserId(route.params?.uid)
    }
  }, [])

  useEffect(() => {
    if (!posts || posts.length === 0) {
      _getPosts()
    }
  }, [posts])

  const handleGetUserById = async (uid) => {
    const user = await getUserById(uid)
    if (user.exists) {
      setUser(user.data())
    }
  }

  const handleGetPostsByUserId = async (uid) => {
    const result = await getPostsByUserId(uid)
    const posts = result.docs.map((doc) => {
      let data = doc.data()
      let id = doc.id
      return { id, ...data }
    })
    setUserPosts(posts)
  }

  if (user === null) {
    return <View />
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>Profile: {user.name}</Text>
        <Text>Email: {user.email}</Text>
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: item.imageUri }}
              />
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  containerImage: {
    flex: 1 / 3
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1
  }
})

export default ProfileScreen