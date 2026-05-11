// src/components/admin/PrivateRoute.tsx

import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({
  children,
}: Props) {

  // CHECK TOKEN
  const token = localStorage.getItem("adminToken");

  // NOT LOGGED IN
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  // LOGGED IN
  return children;
}