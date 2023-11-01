import React from 'react'; // Import React

import './App.css';
import Login from './components/Authentication/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Authentication/Register/Register';
import VerifyGmailForm from './components/Authentication/Verify/VerifyGmailForm';
import HomeComponent from './components/Home/HomeComponent';
import OrderPageComponent from './components/Order/OrderPage/OrderPageComponent';
import MatchingBirdComponent from './components/Views/MatchingBird/MatchingBirdComponent';
import BirdPageComponent from './components/Views/BirdPage/BirdPageComponent';
import Contact from './components/Pages/Contact/Contact';
import About from './components/Pages/About/About';
import DetailBirdPageComponent from './components/Views/DetailBirdPage/DetailBirdPageComponent';
import CartComponent from './components/Views/Cart/CartComponent';
import ManageBirdList from './components/adminmanagebirdlist/ManageBirdList';
import ManageEmployee from './components/adminmanageemployee/ManageEmployee';
import ManageVoucher from './components/adminmanagevoucher/ManageVoucher';
import { AdminDashBoard } from './components/admindashboard/AdminDashboard';
import ManageTypeOfBirdList from './components/AdminManageTypeOfBird/adminmanagebirdlist/ManageTypeOfBirdList';
import UserProfileComponent from './components/Views/UserProfile/UserProfileComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<Login></Login>} />
          <Route path='/auth/register' element={<Register></Register>} />
          <Route path='/auth/verify' element={<VerifyGmailForm></VerifyGmailForm>}></Route>
          <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
          <Route path='/order-page' element={<OrderPageComponent ></OrderPageComponent>}></Route>
          <Route path='/order/order-detail'></Route>
          <Route path='/matching-bird' element={<MatchingBirdComponent></MatchingBirdComponent>}></Route>
          <Route path='/bird' element={<BirdPageComponent></BirdPageComponent>}></Route>
          <Route path="/bird/detail/:_id" element={<DetailBirdPageComponent></DetailBirdPageComponent>}></Route>
          <Route path='/cart' element={<CartComponent></CartComponent>}></Route>

          {/* ADMIN DASHOBOARD AND MANAGE BIRD EMPLOYEE VOUCHER */}
          <Route path='/admin-dashboard' element={<AdminDashBoard></AdminDashBoard>}></Route>
          <Route path='/admin-manage-bird' element={<ManageBirdList></ManageBirdList>}></Route>
          <Route path='/admin-manage-typeofbird' element={<ManageTypeOfBirdList></ManageTypeOfBirdList>}></Route>
          <Route path='/admin-manage-employee' element={<ManageEmployee></ManageEmployee>}></Route>
          <Route path='/admin-manage-voucher' element={<ManageVoucher></ManageVoucher>}></Route>
          <Route path='/user-profile' element={<UserProfileComponent></UserProfileComponent>}></Route>


          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
