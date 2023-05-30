import {useAuth} from "@/contexts/auth";
import {Navigate} from "react-router-dom";
import React from "react";


export const ProtectedRoute = ({ page }: { page: React.ComponentType }): React.ReactElement => {

  const {user} = useAuth();

  if (!user) {
    return <Navigate to={"/signin"} replace/>
  }

  return React.createElement(page, {});
};