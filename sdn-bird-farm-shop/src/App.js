import React from 'react'; // Import React

import './App.css';
import Login from './components/Authentication/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Authentication/Register/Register';
import VerifyGmailForm from './components/Authentication/Verify/VerifyGmailForm';
import HomeComponent from './components/Home/HomeComponent';
import OrderPageComponent from './components/Order/OrderPage/OrderPageComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<Login></Login>} />
          <Route path='/auth/register' element={<Register></Register>} />
          <Route path='/auth/verify' element={<VerifyGmailForm></VerifyGmailForm>}></Route>
          <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
          <Route path='/order-page' element={<OrderPageComponent></OrderPageComponent>}></Route>
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
