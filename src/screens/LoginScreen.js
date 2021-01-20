import React, { useState } from 'react'
import { View, Button, TextInput } from 'react-native'

import { login } from '../firebase/actions'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const result = await login(email, password)
        console.log(result)
    }

    return (
        <View>
            <TextInput placeholder="email" id="email" value={email} onChangeText={(email) => setEmail(email)} />
            <TextInput placeholder="password" id="password" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)} />
            <Button onPress={handleLogin} title="Login" />
        </View>
    )
}

export default LoginScreen