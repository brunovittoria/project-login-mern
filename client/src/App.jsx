import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from "./Signup";
import Login from './Login';
import Admin from './Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}