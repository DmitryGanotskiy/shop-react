import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import Login from './Log/Log'
import Settings from './Settings/Settings'

const App = () => {
  return (
    <>
      <Sidebar/>
      <Main/>
      <Login />
      <Settings />
    </>
  )
}

export default App
