import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Image } from 'react-native'

import { useUser } from '../hooks/useUser'
import { usePost } from '../hooks/usePost'

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useUser()
  const { posts, _getPosts } = usePost()

  useEffect(() => {
    if (!posts || posts.length === 0) {
      _getPosts()
    }
  }, [posts])

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>Profile: {currentUser.name}</Text>
        <Text>Profile: {currentUser.email}</Text>
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
    marginTop: 40
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