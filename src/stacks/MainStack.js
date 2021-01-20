import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import AddImageScreen from '../screens/AddImageScreen'
import SaveImageScreen from '../screens/SaveImageScreen'

const Stack = createStackNavigator()
const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddImage" component={AddImageScreen} />
      <Stack.Screen name="SaveImage" component={SaveImageScreen} />
    </Stack.Navigator>
  )
}

export default MainStack