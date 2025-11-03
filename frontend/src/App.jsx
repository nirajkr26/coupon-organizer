import React from 'react'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<h1>Coupon Organiser</h1>}></Route>
      <Route path='*' element={<h1>404</h1>}></Route>
    </Routes>
  )
}

export default App