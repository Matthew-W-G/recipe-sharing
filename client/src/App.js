import './App.css';
import Header from './components/header';
import Login from './components/login';
import Home from './components/home/home';
import User from './components/User';
import FindRecipes from './components/findRecipes/findRecipes'
import ViewRecipe from './components/viewRecipe/viewRecipe';
import AddRecipe from './components/addRecipe/addRecipe';
import { React } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from './loginSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/verifyToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Important for cookies
    }).then((response) => {
      if (!response.ok) {
        dispatch(logoutAction());
        throw new Error('Response not OK');
      }
      return response.json();
    }).then(data => {
      dispatch(loginAction(data.userID));
    }).catch(error => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/findrecipes" element={<FindRecipes />}></Route>
        <Route path="/addrecipe" element={<AddRecipe />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/recipe/:recipeID" element={<ViewRecipe ></ViewRecipe>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
