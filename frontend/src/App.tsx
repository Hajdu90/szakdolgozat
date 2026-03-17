import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Csomagok from "./components/Csomagok/Csomagok";
import CsomagReszlet from "./components/Csomagok/CsomagReszlet";
import Footer from "./components/Footer/Footer";
import Utazasaim from "./components/BejelentkezesUtan/Utazasaim";
import Admin from "./components/Admin/Admin";
import ProtectAdminRoute from "./components/Admin/ProtectAdminRoute";
import { KosarProvider } from "./components/Kosar/KosarContext";
import Kosar from "./components/Kosar/Kosar";

import { AuthProvider } from "./components/Authorization/AuthContext"; 

function App() {
  return (
    
    <AuthProvider>
      <KosarProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/csomagok" element={<Csomagok />} />
          <Route path="/csomagok/:id" element={<CsomagReszlet />} />
          <Route path="/utazasaim" element={<Utazasaim />} />
          <Route path="/admin" element={
            <ProtectAdminRoute>
              <Admin />
            </ProtectAdminRoute>
          } />
          <Route path="/kosar" element={<Kosar />} />
        </Routes>
        <Footer />
      </KosarProvider>
    </AuthProvider>
  );
}

export default App;