import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Carousel from "./components/Carousel/Carousel.jsx";
import Login from "./components/Login/Login.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>¬
      {showLogin ? <Login setShowLogin={setShowLogin} /> : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Carousel />
      </div>
    </>
  );
};

export default App;
