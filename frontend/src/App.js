import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './pages/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'

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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
