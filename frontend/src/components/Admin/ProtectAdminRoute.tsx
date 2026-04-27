import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Authorization/AuthContext";  

interface ProtectAdminRouteProps {
  children: React.ReactElement;
}

export default function ProtectAdminRoute({ children }: ProtectAdminRouteProps) {
 
  const { isAdmin, isInitialSync } = useAuth();


  if (isInitialSync) {
    return <div>Admin jogosultság ellenőrzése...</div>; 
  }

 
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

 
  return children;
}