import { useEffect, useState } from "react";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";

import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);

      const token = localStorage.getItem("token");

      if (token) {
        setIsLoggedIn(true);
      }
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  if (!isLoggedIn) {
    if (showSignup) {
      return (
        <Signup
          onBackToLogin={() => setShowSignup(false)}
        />
      );
    }

    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onSignup={() => setShowSignup(true)}
      />
    );
  }

  return <Chat />;
}

export default App;