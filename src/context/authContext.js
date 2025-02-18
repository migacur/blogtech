"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const ContextoUsuario = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, guardarUsuario] = useState(null);
  const router = useRouter()
  const autenticarUser = useCallback(async () => {

    try {
      const response = await fetch("/api/users/verify", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
      const data = await response.json();
      guardarUsuario(data);
      return true;
      }
    } catch (e) {
      logoutUser();
      return false;
    }
  }, []);

  useEffect(() => {
    if(!usuario){
      autenticarUser();
    }
   
  }, [usuario,autenticarUser]);

  const logoutUser = async() => {
    if(!usuario) return;
    try {
      const response = await fetch("/api/users/logout", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
      guardarUsuario(null);
      router.push("/")
      }

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ContextoUsuario.Provider
      value={{ usuario, guardarUsuario, autenticarUser, logoutUser }}
    >
      {children}
    </ContextoUsuario.Provider>
  );
};
