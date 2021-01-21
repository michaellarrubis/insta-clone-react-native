import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'

import { logout } from '../firebase/actions'

const FeedScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Feed</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  )
}

export default FeedScreen