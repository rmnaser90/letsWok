import React from 'react'
import './App.css';
import './styles/waiter.css';
import './styles/SignIn.css';
import './styles/Kitchen.css';
import './styles/Driver.css';
import './styles/Admin.css';
import { useEffect } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AuthenticationStore from './stores/AuthenticationStore'
import Auth from './components/Auth';
import InputsStore from './stores/InputsStore';
import WaiterStore from './stores/WaiterStore';
import KitchenStore from './stores/KitchenStore';
import DriverStore from './stores/DriverStore';
import Header from './components/Header';
import AdminStore from './stores/AdminStore';

const authenticationStore = new AuthenticationStore()
const inputsStore = new InputsStore()
const waiterStore = new WaiterStore()
const kitchenStore = new KitchenStore()
const driverStore = new DriverStore()
const adminStore = new AdminStore()
const stores = { adminStore, kitchenStore, driverStore, authenticationStore, inputsStore, waiterStore }

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

