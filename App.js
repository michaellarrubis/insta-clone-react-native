import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import BaseScreen from './src/screens/BaseScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import LoginScreen from './src/screens/LoginScreen'
import HomeScreen from './src/screens/HomeScreen'

import Loading from './src/components/Loading'

import firebase from './src/firebase'

import { Provider } from 'react-redux'
import { store } from './src/redux'

const Stack = createStackNavigator()
export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    handleCheckUserLoggedIn()
  }, [handleCheckUserLoggedIn])

  const handleCheckUserLoggedIn = async () => {
    await firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    })
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Base">
          <Stack.Screen name="Base" component={BaseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <Provider store={store}>
        <HomeScreen options={{ headerShown: false }} />
      </Provider>
    )
  }
}
