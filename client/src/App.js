import './App.css';
import React, {Fragment, useState, useEffect} from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import HomePage from './pages/HomePage';
import Feed from './pages/Feed';
import FollowingFeed from './pages/FollowingFeed';
import RecipeDetail from './pages/RecipeDetail';
import NewRecipe from './pages/NewRecipe';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Cookbooks from './pages/Cookbooks';
import CookbookDetail from './pages/CookbookDetail';


function App() {
  const {isAuthenticated} = useAuth0(); 

  return (<BrowserRouter>
    <nav>
      <Link to="/recipes">Recipes</Link> |{" "}
      <Link to="/recipes/new">New Recipe</Link> |{" "}
      <Link to="/login">login</Link> |{" "}
      {isAuthenticated && (
        <>
          <Link to="/following">Following</Link> |{" "}
          <Link to="/cookbooks">Cookbooks</Link> |{" "}
          <Link to="/profile">Profile</Link>
        </>
      )}
    </nav>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/recipes" element={<Feed/>} />
      <Route path="/following" element={<FollowingFeed/>} />
      <Route path="/recipes/new" element={<NewRecipe/>} />
      <Route path="/recipes/:id" element={<RecipeDetail/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/profile/:username" element={<UserProfile/>} />
      <Route path="/cookbooks" element={<Cookbooks/>} />
      <Route path="/cookbooks/:id" element={<CookbookDetail/>} />
    </Routes>
  </BrowserRouter>)
}
export default App;
