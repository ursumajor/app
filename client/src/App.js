import './App.css';
import React, {Fragment, useState, useEffect} from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import DBTool from './pages/DBTool';
import HomePage from './pages/HomePage';


function App() {
  return (<BrowserRouter>
    <nav>
      <Link to="/DBtool/data">DBTool</Link> |{" "}
    </nav>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/DBtool/:db" element={<DBTool/>} />
    </Routes>
  </BrowserRouter>)
}
export default App;
