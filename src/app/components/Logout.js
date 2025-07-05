"use client";

import { ContextoUsuario } from "@/context/authContext";
import { useContext } from "react";
import Swal from "sweetalert2";

const Logout = () => {
  const { guardarUsuario } = useContext(ContextoUsuario);

  const logoutUser = async () => {
    try {
      const res = await fetch("/api/users/logout");
      if (res.status === 200) {
        Swal.fire({
          title: "Has cerrado la sesión",
          text: "¡Vuelve pronto!",
          icon: "success",
        });
        guardarUsuario(null);
        return window.location.href = '/';
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      Swal.fire({
        title: "Ha ocurrido un error",
        text: res.msg,
        icon: "error",
      });
    }
  };

  return (
    <li
      onClick={logoutUser}
      className="mt-1 p-2 flex items-center cursor-pointer transition-all hover:bg-slate-200 hover:text-slate-900 w-[100%]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        className="mr-1 fill-red-700"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z" />
      </svg>
      Salir
    </li>
  );
};

export default Logout;
