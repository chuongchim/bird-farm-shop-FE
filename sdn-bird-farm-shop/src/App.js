import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Contact from './components/Pages/Contact/Contact';
import About from './components/Pages/About/About';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routesz>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>

        </Routesz>
      </BrowserRouter>
    </div>
  );
}

export default App;
