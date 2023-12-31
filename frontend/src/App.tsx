import './App.css'
import  {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CreateNew, Login, Register, UpdateOrder, OrderList, Profile } from './pages'
import AppProvider from './provider/AppProvider'

function App() {
  
  
  return (

      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<Login />} /> 
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<OrderList />} />
            <Route path='/add' element={<CreateNew />} />
            <Route path='/edit/:id' element={<UpdateOrder />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>

  )
}

export default App

