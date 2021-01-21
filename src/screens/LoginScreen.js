import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'

import { login } from '../firebase/actions'
import { useUser } from '../hooks/useUser'

const LoginScreen = ({ navigation }) => {
  const { _getUser } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const result = await login(email, password)
    if (result) {
      _getUser()
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput placeholder="email" id="email" value={email} onChangeText={(email) => setEmail(email)} />
      <TextInput placeholder="password" id="password" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} />
      <Button onPress={handleLogin} title="Login" />
    </View>
  )
}

export default LoginScreen