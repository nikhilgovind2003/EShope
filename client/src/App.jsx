import './App.css'
import Navbar from './Components/Navbar/Navbar'
import React from 'react'
import ViewProducts from './Components/ViewProducts/ViewProducts'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NewProducts from './Components/NewProducts/NewProducts'
import EditProduct from './Components/Edit/EditProduct'
import PrivateRoute from './utils/PrivateRoute'

const App = () => {



  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          <PrivateRoute>
            <ViewProducts />
          </PrivateRoute>
        } />
        <Route path="/new-product" element={<PrivateRoute>
          <NewProducts />
        </PrivateRoute>} />
        <Route path="/edit-product/:id" element={<PrivateRoute>
          <EditProduct />
        </PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
