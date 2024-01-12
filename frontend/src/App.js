import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import AllUsers from './pages/AllUsers'
import Admin from './pages/Admin'
import UpdateUser from './pages/UpdateUser'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/admin/create'
              element={<CreateUser />}
            />
            <Route
              path='/admin/allusers'
              element={<AllUsers />}
            />
            <Route
              path='/admin'
              element={<Admin />}
            />
            <Route 
              path='/admin/updateuser'
              element={<UpdateUser />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
