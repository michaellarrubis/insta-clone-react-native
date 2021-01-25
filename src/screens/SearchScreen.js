import React, { useState } from 'react'
import { Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'

import { getUsersByName } from '../firebase/actions'

const SearchScreen = ({ navigation }) => {
  const [users, setUsers] = useState([])

  const handleGetUsers = async (name) => {
    const result = await getUsersByName(name)
    const users = result.docs.map((doc) => {
      let data = doc.data()
      let id = doc.id
      return { id, ...data }
    })
    setUsers(users)
  }
  return (
    <View style={{ marginTop: 50 }}>
      <TextInput placeholder="Type here ..." onChangeText={(name) => handleGetUsers(name)} />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Profile", { uid: item.id })}>
            <Text>{item.name}</Text>
            <Text>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default SearchScreen
