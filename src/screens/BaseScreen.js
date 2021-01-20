import React from 'react'
import { Text, View, Button } from 'react-native'

const BaseScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title='Register' onPress={() => navigation.navigate('Register')}></Button>
      <Button title='Login' onPress={() => navigation.navigate('Login')}></Button>
    </View>
  )
}

export default BaseScreen