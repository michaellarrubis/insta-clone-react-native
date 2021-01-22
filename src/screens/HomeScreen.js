import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FeedScreen from './FeedScreen'
import ProfileScreen from './ProfileScreen'
import SearchScreen from './SearchScreen'

import { getCurrentUserId } from '../firebase/actions'

const EmptyScreen = () => {
  return null
}

const Tab = createMaterialBottomTabNavigator()
const MainStack = () => {

  return (
    <Tab.Navigator initialRouteName="Search" labeled={false}>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }} />
      <Tab.Screen
        name="Add"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.navigate("AddImage")
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          )
        }} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate("Profile", { uid: getCurrentUserId()?.uid })
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          )
        }} />
    </Tab.Navigator>
  )
}

export default MainStack