import React from 'react'; // Import React

import './App.css';
import Login from './components/Authentication/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Authentication/Register/Register';
import VerifyGmailForm from './components/Authentication/Verify/VerifyGmailForm';
import HomeComponent from './components/Home/HomeComponent';
import OrderPageComponent from './components/Order/OrderPage/OrderPageComponent';
import { AdminDashBoard } from './components/admindashboard/AdminDashboard';
import ManageBirdList from './components/adminmanagebirdlist/ManageBirdList';
import ManageEmployee from './components/adminmanageemployee/ManageEmployee';
import ManageVoucher from './components/adminmanagevoucher/ManageVoucher';

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

          {/* ADMIN DASHOBOARD AND MANAGE BIRD EMPLOYEE VOUCHER */}
          <Route path='/admin-dashboard' element={<AdminDashBoard></AdminDashBoard>}></Route>
          <Route path='/admin-manage-bird' element={<ManageBirdList></ManageBirdList>}></Route>
          <Route path='/admin-manage-employee' element={<ManageEmployee></ManageEmployee>}></Route>
          <Route path='/admin-manage-voucher' element={<ManageVoucher></ManageVoucher>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
