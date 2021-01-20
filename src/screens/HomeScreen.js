import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'

import { logout } from '../firebase/actions'
import { useUser } from '../hooks/useUser'

const HomeScreen = ({ navigation }) => {
  const { _getUser, currentUser } = useUser()
  const [user, setUser] = useState(null)

  useEffect(() => {
    _getUser()
    if (currentUser && Object.keys(currentUser).length > 0) {
      setUser(currentUser)
    }
  }, [currentUser])

  const handleLogout = () => {
    logout()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Home: {user?.name}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default HomeScreen