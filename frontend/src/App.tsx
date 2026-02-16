import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/Navbar/NavBar';
import Csomagok from './components/Csomagok/Csomagok';
import Home from './components/Home/Home';

function App() {
  return (
   <BrowserRouter>
   <Header/>
   <NavBar/>

   <Routes>
    {/* <Route path='/' element={<Home/>}/>
     */}
     <Route path='/' element={<Home/>}/>
     <Route path='/csomagok' element={<Csomagok/>}/>
    
    </Routes>
   </BrowserRouter>
  );
}

export default App;
