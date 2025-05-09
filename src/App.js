import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import SignIn from './components/SignIn';
import AddProduct from './components/AddProduct';
import GetProduct from './components/GetProduct';
import SingleProduct from './components/SingleProduct';
import AboutUs from './components/AboutUs';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import ChatBot from './components/ChatBot.jsx';
import React, { useContext } from 'react';
import Cart from "./components/Cart.jsx";    
import ContactUs from "./components/ContactUs.jsx";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.product_id !== id));
  };
  
  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item =>
      item.product_id === id ? { ...item, quantity } : item
    ));
  };
  

  return (
    <Router>
       
      <div className="App">
        <header className="App-header">
          <h1>Mansory Fashion house</h1>
        </header>

        {/* <button onClick={toggleTheme} className="theme-toggle"> */}
          {/* {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />} */}
        {/* </button> */}

        <Navbar theme={theme} toggleTheme={toggleTheme} /> {/* Pass the props */}

        <Routes>
          <Route path = "/signup" element = {<SignUp/>}/>
          <Route path = "/signin" element = {<SignIn/>}/>
          <Route path = "/addproduct" element = {<AddProduct/>}/>
          <Route path = "/" element = {<GetProduct/>}/>
          <Route path = "/singleproduct" element = {<SingleProduct/>}/>
          <Route path = "/aboutus" element = {<AboutUs/>}/>
          <Route path = "/chatbot" element = {<ChatBot/>}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>

    </Router>

);

}

export default App;