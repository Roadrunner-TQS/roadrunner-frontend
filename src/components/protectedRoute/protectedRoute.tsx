import {useAuth} from "@/contexts/auth";
import {Navigate} from "react-router-dom";
import React from "react";


export const ProtectedRoute = ({ page, authorized }: { page: React.ComponentType, authorized: string[] }): React.ReactElement => {

  const {user} = useAuth();

  if (!user) {
    return <Navigate to={"/signin"} replace/>
  }

  if (authorized.includes(user.role)) {
    return React.createElement(page, {});
  }

    return <Navigate to={"/"} replace/>
};