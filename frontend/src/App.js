import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Create from './components/Create';
import Update from './components/Update';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="App">
      <Toaster position='top-right' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/welcome' element={<Welcome />}></Route>
          <Route path='/welcome/update/:id' element={<Update/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
