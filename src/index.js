import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About'
import Home from './pages/Home/App';
import MultiQA from './pages/MultiQA';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='multiqa' element={<MultiQA />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
