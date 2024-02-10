import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { DashBoard } from './pages/Dashboard'
import { Send } from './pages/Send'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path = '/signup' element={<SignUp></SignUp>}></Route>
            <Route path = '/signin' element={<SignIn></SignIn>}></Route>
            <Route path = '/dashboard' element={<DashBoard></DashBoard>}></Route>
            <Route path = '/send' element={<Send></Send>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
