import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";

import Csomagok from "./components/Csomagok/Csomagok";
import Home from "./components/Home/Home";
import CsomagReszlet from "./components/Csomagok/CsomagReszlet";
import Footer from "./components/Footer/Footer";

import Utazasaim from "./components/BejelentkezesUtan/Utazasaim";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()!.split(";").shift()!);
  }

  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoginInProgress, setIsLoginInProgress] = useState<boolean>(false);
  const [loggedInUserName, setLoggedInUserName] = useState<string>("");

  const extractDisplayName = (user: Record<string, unknown>): string => {
    const name =
      (typeof user?.name === "string" && user.name.trim()) ||
      (typeof user?.nev === "string" && user.nev.trim()) ||
      "";
    const email = typeof user?.email === "string" ? user.email.trim() : "";

    return name || email || "Felhasznalo";
  };

  const syncCurrentUser = async (): Promise<boolean> => {
    try {
      const userResponse = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!userResponse.ok) {
        setIsLoggedIn(false);
        setLoggedInUserName("");
        return false;
      }

      const user = await userResponse.json();
      const displayName = extractDisplayName(user);

      setIsLoggedIn(true);
      setLoggedInUserName(displayName);
      return true;
    } catch (error) {
      console.error("Current user sync failed:", error);
      setIsLoggedIn(false);
      setLoggedInUserName("");
      return false;
    }
  };

  useEffect(() => {
    syncCurrentUser();
  }, []);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    if (isLoginInProgress) {
      return;
    }

    setIsLoginInProgress(true);

    try {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      const xsrfToken = getCookie("XSRF-TOKEN");

      if (!xsrfToken) {
        console.error("XSRF token not found");
        return;
      }

      const loginResponse = await fetch("http://localhost:8000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": xsrfToken,
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        console.error("Login failed:", loginResponse.status, errorText);
        return;
      }

      await syncCurrentUser();

      console.log("Login successful", loginResponse.status);
    } catch (error) {
      console.error("Login request failed:", error);
    } finally {
      setIsLoginInProgress(false);
    }
  };

  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        loggedInUserName={loggedInUserName}
        isLoginInProgress={isLoginInProgress}
        setIsLoggedIn={setIsLoggedIn}
        setLoggedInUserName={setLoggedInUserName}
        onLogin={handleLogin}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/csomagok" element={<Csomagok />} />
        <Route path="/csomagok/:id" element={<CsomagReszlet />} />
        <Route path="/utazasaim" element={<Utazasaim />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
