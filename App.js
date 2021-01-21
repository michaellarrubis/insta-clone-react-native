import React from 'react'

import BaseStack from './src/stacks/BaseStack'

import { Provider } from 'react-redux'
import { store } from './src/redux'

export default function App() {
  return (
    <Provider store={store}><BaseStack /></Provider>
  )
}
