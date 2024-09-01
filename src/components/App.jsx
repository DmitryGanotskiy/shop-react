import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Main from './Main/Main'
import Login from './Log/Log'
import Settings from './Settings/Settings'
import Create from './Create/Create'
import Stage1 from './Create/Stage1/Stage1'
import Stage2 from './Create/Stage2/Stage2'
import Stage3 from './Create/Stage3/Stage3'
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
      <Stage1 />
      <Stage2 />
      <Stage3 />
    </>
  )
}

export default App
