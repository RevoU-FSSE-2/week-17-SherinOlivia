import './App.css'
import  {BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreateNew, Login, Register, UpdateCategory, CategoryList, Profile } from './pages'
import AppProvider from './provider/AppProvider'

function App() {
  
  
  return (

      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path='/login' element={<Login />} /> 
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<CategoryList />} />
            <Route path='/add' element={<CreateNew />} />
            <Route path='/edit/:id' element={<UpdateCategory />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>

  )
}

export default App

