import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Csomagok from "./components/Csomagok/Csomagok";
import Home from "./components/Home/Home";
import CsomagReszlet from "./components/Csomagok/CsomagReszlet";
import Footer from "./components/Footer/Footer";
import Utazasaim from "./components/BejelentkezesUtan/Utazasaim";
import Admin from "./components/Admin/Admin";
import ProtectAdminRoute from "./components/Admin/ProtectAdminRoute";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(";").shift()!);
  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginInProgress, setIsLoginInProgress] = useState<boolean>(false);
  const [loggedInUserName, setLoggedInUserName] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const extractDisplayName = (user: any): string => {
    return user?.name || user?.nev || user?.email || "Felhasználó";
  };

  const syncCurrentUser = async (): Promise<boolean> => {
    try {
      const userResponse = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!userResponse.ok) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return false;
      }

      const user = await userResponse.json();
      setIsLoggedIn(true);
      setLoggedInUserName(extractDisplayName(user));
    
      setIsAdmin(user.roles === true); 
      return true;
    } catch (error) {
      setIsLoggedIn(false);
      return false;
    }
  };

  useEffect(() => {
    syncCurrentUser();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    if (isLoginInProgress) return;
    setIsLoginInProgress(true);

    try {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", { credentials: "include" });
      const xsrfToken = getCookie("XSRF-TOKEN");

      const loginResponse = await fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfToken || "",
        },
        body: JSON.stringify({ email, password }),
      });

      if (loginResponse.ok) {
        await syncCurrentUser(); 
      }
    } catch (error) {
      console.error("Login request failed:", error);
    } finally {
      setIsLoginInProgress(false);
    }
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        loggedInUserName={loggedInUserName}
        isLoginInProgress={isLoginInProgress}
        setIsLoggedIn={setIsLoggedIn}
        setLoggedInUserName={setLoggedInUserName}
        onLogin={handleLogin}
        isAdmin={isAdmin}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csomagok" element={<Csomagok />} />
        <Route path="/csomagok/:id" element={<CsomagReszlet />} />
        <Route path="/utazasaim" element={<Utazasaim />} />
        <Route 
          path="/admin" 
          element={
            <ProtectAdminRoute isAdmin={isAdmin}>
              <Admin />
            </ProtectAdminRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;