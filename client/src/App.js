import './App.css';
import React, {Fragment, useState, useEffect} from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import HomePage from './pages/HomePage';
import Feed from './pages/Feed';
import RecipeDetail from './pages/RecipeDetail';
import NewRecipe from './pages/NewRecipe';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';


function App() {
  const {isAuthenticated} = useAuth0(); 

  return (<BrowserRouter>
    <nav>
      <Link to="/recipes">Recipes</Link> |{" "}
      <Link to="/recipes/new">New Recipe</Link> |{" "}
      <Link to="/login">login</Link> |{" "}
      {isAuthenticated && (
        <Link to="/profile">Profile</Link>
      )}
    </nav>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/recipes" element={<Feed/>} />
      <Route path="/recipes/new" element={<NewRecipe/>} />
      <Route path="/recipes/:id" element={<RecipeDetail/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/profile/:username" element={<UserProfile/>} />
    </Routes>
  </BrowserRouter>)
}
export default App;
