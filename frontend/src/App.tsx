import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';

import Csomagok from './components/Csomagok/Csomagok';
import Home from './components/Home/Home';
import CsomagReszlet from './components/Csomagok/CsomagReszlet';
import Footer from './components/Footer/Footer';



function App() {
  return (
   <BrowserRouter>
   <Header/>
 

   <Routes>
    {/* <Route path='/' element={<Home/>}/>
     */}
     <Route path='/' element={<Home/>}/>
     <Route path='/csomagok' element={<Csomagok/>}/>
     <Route path='/csomagok/:id' element={<CsomagReszlet/>}/>
    
    </Routes>
    <Footer/>
   </BrowserRouter>

  );
}

export default App;
