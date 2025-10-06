import './App.css';
import React, {Fragment, useState, useEffect} from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import DBTool from './pages/DBTool';
import HomePage from './pages/HomePage';
import UploadYourImage from './pages/upload-your-image';
import ImageViewer from './pages/ImageViewer';

function App() {
  return (<BrowserRouter>
    <nav>
      <Link to="/DBtool/data">DBTool</Link> |{" "}
      <Link to="/images">images</Link> |{" "}
      <Link to="/image_viewer">image_viewer</Link> |{" "}

    </nav>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/DBtool/:db" element={<DBTool/>} />
      <Route path="/images" element={<UploadYourImage/>} />
      <Route path="/image_viewer" element={<ImageViewer/>} />
    </Routes>
  </BrowserRouter>)
}
export default App;
