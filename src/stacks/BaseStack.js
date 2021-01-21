import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import MainStack from './MainStack'
import Loading from '../components/Loading'

import firebase from '../firebase'
import { useUser } from '../hooks/useUser'

const BaseStack = () => {
  const { _getUser } = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    handleCheckUserLoggedIn()
  }, [handleCheckUserLoggedIn])

  const handleCheckUserLoggedIn = async () => {
    await firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        setIsLoggedIn(true)
        _getUser()
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

  return (
    <NavigationContainer>
      {!isLoggedIn ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  )
}

export default BaseStack