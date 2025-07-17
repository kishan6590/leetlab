import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import apiClient from "../../service/apiClient";

function LogoutButton({ children }) {
  const onLogout = async () => {
    await apiClient.logout();
  };
  return (
    <button className="btn btn-primary " onClick={onLogout}>
      {children}
    </button>
  );
}

export default LogoutButton;
