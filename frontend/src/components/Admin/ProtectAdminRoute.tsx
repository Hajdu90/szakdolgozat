import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Authorization/AuthContext";  

interface ProtectAdminRouteProps {
  children: React.ReactElement;
}

export default function ProtectAdminRoute({ children }: ProtectAdminRouteProps) {
 
  const { isAdmin, isInitialSync } = useAuth();

  // FONTOS: Amíg az app az elején ellenőrzi a sütiket (isInitialSync),máskeppen egy frissitessel kidodna a föoldara
  if (isInitialSync) {
    return <div>Admin jogosultság ellenőrzése...</div>; 
  }

  // Ha a szinkronizáció kész, és kiderült, hogy NEM admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Ha admin, akkor megjelenítjük a védett tartalmat
  return children;
}