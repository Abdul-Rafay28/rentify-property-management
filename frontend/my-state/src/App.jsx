import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import AddProperty from './pages/AddProperty'
import GetProperty from './pages/GetProperty'
import SingleProperty from './pages/singleProperty'
import SignUP from './pages/SignUp'
import UsersData from './pages/getUsersData'
import UsersAllProperty from './pages/AdminCheckProperty'
import Inquiry from './pages/Inquiry'
import GetUsersReq from './pages/GetUsersReq'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<GetProperty />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addProperty' element={<AddProperty />} />
        <Route path='/property/:id' element={<SingleProperty />} />
        <Route path='/signUp' element={<SignUP />} />
        <Route path='/usersData' element={<UsersData />} />
        <Route path='/getAllProperty' element={<UsersAllProperty />} />
        <Route path='/inquiry/:id' element={<Inquiry />} />
        <Route path='/getUsersReq' element={<GetUsersReq />} />
      </Routes>
    </>
  )
}

export default App
