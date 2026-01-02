import './App.css';
import React, {Fragment, useState, useEffect} from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import DBTool from './pages/DBTool';
import HomePage from './pages/HomePage';
import UploadYourImage from './pages/upload-your-image';
import ImageViewer from './pages/ImageViewer';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';


function App() {
  const {isAuthenticated} = useAuth0(); 

  return (<BrowserRouter>
    <nav>
      <Link to="/DBtool/data">DBTool</Link> |{" "}
      <Link to="/images">images</Link> |{" "}
      <Link to="/image_viewer">image_viewer</Link> |{" "}
      <Link to="/login">login</Link> |{" "}
      {isAuthenticated && (
        <Link to="/profile">Profile</Link>
      )}
    </nav>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/DBtool/:db" element={<DBTool/>} />
      <Route path="/images" element={<UploadYourImage/>} />
      <Route path="/image_viewer" element={<ImageViewer/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  </BrowserRouter>)
}
export default App;
