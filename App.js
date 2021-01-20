import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './src/stacks/AuthStack'
import MainStack from './src/stacks/MainStack'

import Loading from './src/components/Loading'

import firebase from './src/firebase'

import { Provider } from 'react-redux'
import { store } from './src/redux'

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
        <AuthStack />
      </NavigationContainer>
    )
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </Provider>
    )
  }
}
