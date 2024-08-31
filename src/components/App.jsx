import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import Login from './Log/Log'
import Settings from './Settings/Settings'
import Create from './Create/Create'
import Help from './Help/Help'

const App = () => {
  return (
    <>
      <Sidebar/>
      <Main/>
      <Login />
      <Settings />
      <Create />
      <Help />
    </>
  )
}

export default App
