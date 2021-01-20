import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'

import { register } from '../firebase/actions'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    register(name, email, password)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput placeholder="name" id="name" value={name} onChangeText={(name) => setName(name)} />
      <TextInput placeholder="email" id="email" value={email} onChangeText={(email) => setEmail(email)} />
      <TextInput placeholder="password" id="password" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} />
      <Button onPress={handleRegister} title="Register" />
    </View>
  )
}

export default RegisterScreen