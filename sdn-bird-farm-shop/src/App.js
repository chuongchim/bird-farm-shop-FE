<<<<<<< HEAD
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Contact from './components/Pages/Contact/Contact';
import About from './components/Pages/About/About';

=======
import React from 'react'; // Import React

import './App.css';
import Login from './components/Authentication/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Authentication/Register/Register';
import VerifyGmailForm from './components/Authentication/Verify/VerifyGmailForm';
import HomeComponent from './components/Home/HomeComponent';
import OrderPageComponent from './components/Order/OrderPage/OrderPageComponent';
>>>>>>> 3266307d091087d9015f2c89b5bf8f57bfe86a3a

function App() {
  return (
    <div>
      <BrowserRouter>
<<<<<<< HEAD
        <Routesz>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>

        </Routesz>
=======
        <Routes>
          <Route path='/auth/login' element={<Login></Login>} />
          <Route path='/auth/register' element={<Register></Register>} />
          <Route path='/auth/verify' element={<VerifyGmailForm></VerifyGmailForm>}></Route>
          <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
          <Route path='/order-page' element={<OrderPageComponent></OrderPageComponent>}></Route>
          
          
        </Routes>
>>>>>>> 3266307d091087d9015f2c89b5bf8f57bfe86a3a
      </BrowserRouter>
    </div>
  );
}

export default App;
