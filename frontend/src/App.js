import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import UpdateUser from './pages/UpdateUser'

function App() {
  const context = useAuthContext()
  const user = context.user
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={!user ? <Login /> : <Home />}
            />
            <Route 
              path='/admin/updateuser'
              element={user ? <UpdateUser />: <Login />}
            />
            {/*<Route
              path='/home'
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
            />*/}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
