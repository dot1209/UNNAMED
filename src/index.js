import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home/app';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
