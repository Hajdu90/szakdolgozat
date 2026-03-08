
import React from "react";
import { Navigate } from "react-router-dom";

type ProtectAdminRouteProps = {
  isAdmin: boolean;
  children: React.ReactElement; 
};

export default function ProtectAdminRoute({ isAdmin, children }: ProtectAdminRouteProps) {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}