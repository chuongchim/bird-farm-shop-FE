import React from 'react'; // Import React

import './App.css';
import Login from './components/Authentication/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Authentication/Register/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth/login' element={<Login></Login>} />
          <Route path='/auth/register' element={<Register></Register>} />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
