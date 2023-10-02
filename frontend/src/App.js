import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Create from './components/Create';
import Update from './components/Update';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome';
import Home from './components/Home';
import  { Toaster } from 'react-hot-toast';
import { UserProvider } from './Context/UserContext';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Toaster position='top-right' />
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={Home}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/welcome' element={<Welcome />}></Route>
          <Route path='/welcome/update/:id' element={<Update/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
