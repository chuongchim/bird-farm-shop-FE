import React from 'react'; // Import React

import './App.css';
import Login from './components/Authentication/Login/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ManageMatchingRecord from './components/adminmatchingbirds/ManageMatchingRecord';
import { AdminDashBoard } from './components/admindashboard/AdminDashboard';
import ManageTypeOfBirdList from './components/AdminManageTypeOfBird/adminmanagebirdlist/ManageTypeOfBirdList';
import UserProfileComponent from './components/Views/UserProfile/UserProfileComponent';
import { jwtDecode } from 'jwt-decode';
import ErrorPageComponent from './components/Common/ErrorPage/ErrorPageComponent';
import OrderDetailComponent from './components/Views/OrderPage/OrderdetailComponent';

const tokenIsValid = (token) => {
  // Implement your token validation logic here
  try {
    const decoded = jwtDecode(token);
    const expiration = decoded.exp; // assuming your token has an expiration time

    // Check if the token has expired
    return expiration > Math.floor(Date.now() / 1000);
  } catch (error) {
    return false; // Token is invalid
  }
};

const getRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.role; // Adjust this to match the name of the role claim in your token
  } catch (error) {
    return null; // Token is invalid or doesn't contain a role claim
  }
};

const isAuthenticated = (requiredRole) => {
  const token = localStorage.getItem('token'); // Change this to your actual storage method
  if (!tokenIsValid(token)) {
    return false; // Token is invalid
  }

  const userRole = getRoleFromToken(token);
  return userRole === requiredRole;
};

const PrivateRoute = ({ element, path, requiredRole }) => {
  if (isAuthenticated(requiredRole)) {
    return element;
  } else {
    return <Navigate to="/error"/>;
  }
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<Login></Login>} />
          <Route path='/auth/register' element={<Register></Register>} />
          <Route path='/auth/verify' element={<VerifyGmailForm></VerifyGmailForm>}></Route>
          <Route path='/' element={<HomeComponent></HomeComponent>}></Route>
          <Route path='/order-page' element = {<PrivateRoute element={<OrderPageComponent ></OrderPageComponent>} requiredRole="CUSTOMER"/> } />
          <Route path="/order/:_id" element = {<OrderDetailComponent></OrderDetailComponent>} />
          <Route path='/matching-bird' element={<MatchingBirdComponent></MatchingBirdComponent>}></Route>
          <Route path='/bird' element={<BirdPageComponent></BirdPageComponent>}></Route>
          <Route path="/bird/detail/:_id" element={<DetailBirdPageComponent></DetailBirdPageComponent>}></Route>
          <Route path='/cart' element = {<PrivateRoute element={<CartComponent ></CartComponent>} requiredRole="CUSTOMER"/> }></Route>

          {/* ADMIN DASHOBOARD AND MANAGE BIRD EMPLOYEE VOUCHER */}
          <Route path='/admin-dashboard' element={<AdminDashBoard></AdminDashBoard>}></Route>
          <Route path='/admin-manage-bird' element={<ManageBirdList></ManageBirdList>}></Route>
          <Route path='/admin-manage-typeofbird' element={<ManageTypeOfBirdList></ManageTypeOfBirdList>}></Route>
          <Route path='/admin-manage-employee' element={<ManageEmployee></ManageEmployee>}></Route>
          <Route path='/admin-manage-voucher' element={<ManageVoucher></ManageVoucher>}></Route>
          <Route path='/admin-matching-birds' element={<ManageMatchingRecord></ManageMatchingRecord>}></Route>

          <Route path='/user-profile' element={<UserProfileComponent></UserProfileComponent>}></Route>
          <Route
            path='/admin-dashboard'
            element={<PrivateRoute element={<AdminDashBoard />} requiredRole="ADMIN" />}
          />
          <Route
            path="/admin-manage-bird"
            element={<PrivateRoute element={<ManageBirdList />} requiredRole="ADMIN" />}
          />
          <Route
            path='/admin-manage-typeofbird'
            element={<PrivateRoute element={<ManageTypeOfBirdList />} requiredRole="ADMIN" />}
          />
          <Route
            path='/admin-manage-employee'
            element={<PrivateRoute element={<ManageEmployee />} requiredRole="ADMIN" />}
          />
          <Route
            path='/admin-manage-voucher'
            element={<PrivateRoute element={<ManageVoucher />} requiredRole="ADMIN" />}
          />
          <Route path='/user-profile' element = {<PrivateRoute element={<UserProfileComponent ></UserProfileComponent>} requiredRole="CUSTOMER"/> }></Route>


          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>

          <Route path='/error' element={<ErrorPageComponent></ErrorPageComponent>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
