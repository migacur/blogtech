"use client";
import { createContext, useCallback, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export const ContextoUsuario = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, guardarUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const autenticarUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users/verify", {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        guardarUsuario(data);
        return true;
      } else {
        guardarUsuario(null);
        // Limpiar cookies del lado cliente como fallback
        document.cookie = 'myToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        return false;
      }
    } catch (e) {
      guardarUsuario(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Verificar autenticación al montar el contexto
    autenticarUser();
    
    // Verificar periódicamente (cada 5 minutos)
    const interval = setInterval(autenticarUser, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [autenticarUser]);

  const logoutUser = useCallback(async () => {
    try {
      // Intenta llamar al endpoint de logout
      await fetch("/api/users/logout", {
        method: "GET",
        credentials: "include",
      });
    } catch (e) {
      console.error("Error en logout:", e);
    } finally {
      // Limpieza local independientemente de la respuesta del servidor
      guardarUsuario(null);
      
      // Limpiar cookies del lado cliente como fallback
      document.cookie = 'myToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'usuario=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      router.push("/");
    }
  }, [router]);

  // Memoizar el valor del contexto para optimización
  const contextValue = useMemo(() => ({
    usuario,
    guardarUsuario,
    autenticarUser,
    logoutUser,
    loading // ¡IMPORTANTE! Exponer el estado loading
  }), [usuario, autenticarUser, logoutUser, loading]);

  return (
    <ContextoUsuario.Provider value={contextValue}>
      {children}
    </ContextoUsuario.Provider>
  );
};