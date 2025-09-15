import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Input from './pages/Input'
import Upload from './pages/Upload'
import LoginPage from './pages/LoginPage'
import ResultPage from './pages/ResultPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/input' element={<Input />} />
        <Route path='/Upload' element={<Upload />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/result' element={<ResultPage />} /> {/* <-- This must match navigate */}
      </Routes>
    </div>
  )
}

export default App
