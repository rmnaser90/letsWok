import React from 'react'
import './App.css';
import { useEffect } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AuthenticationStore from './stores/AuthenticationStore'
import Auth from './components/Auth';
import InputsStore from './stores/InputsStore';
import Header from './components/Header';
import WaiterStore from './stores/WaiterStore';

const authenticationStore = new AuthenticationStore()
const inputsStore = new InputsStore()
const waiterStore = new WaiterStore()
const stores = { authenticationStore, inputsStore, waiterStore }

const App = () => {
  // authenticationStore.singIn("kitchen1","qweqwe")
  return (
    <Provider {...stores}>

      <Header />
      <Auth />
    </Provider>
  )
}

export default App

