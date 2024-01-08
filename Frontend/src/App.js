import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage'
import MainPage from './MainPage';

const App = () => {
  return (
   <BrowserRouter>
    {/* <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<MainPage/>}/>
    </Routes> */}
    <MainPage/>
   </BrowserRouter>
  )
}

export default App