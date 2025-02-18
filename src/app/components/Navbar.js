"use client";
import Link from "next/link";
import Logout from "./Logout";
import { useContext, useEffect, useState } from "react";
import { ContextoUsuario } from "@/context/authContext";
import { useRouter } from "next/navigation";
import NotFound from "./NotFound";

const Navbar = ({ setShowPerfil, showPerfil, handleMouseLeave }) => {
  const { usuario, autenticarUser } = useContext(ContextoUsuario);
  const router = useRouter();
  const [verificandoAutenticacion, setVerificandoAutenticacion] = useState(true);

  useEffect(() => {
    const rutasPublicas = ["/", "/ingresar", "/registrar"];
    const currentPath = window.location.pathname;

    const verificarAutenticacion = async () => {
      try {
        const autenticado = await autenticarUser();
        if (!autenticado && !rutasPublicas.includes(currentPath)) {
          router.push("/ingresar");
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        return <NotFound message="Ocurrió un error al verificar la sesión del usuario" />;
      } finally {
        setVerificandoAutenticacion(false);
      }
    };

    if (!usuario) {
      verificarAutenticacion();
    } else {
      setVerificandoAutenticacion(false);
    }
  }, [usuario, autenticarUser, router]);

  const handleMouseEnter = () => setShowPerfil(true);

  return (
    <nav>
      <ul className="flex px-2 text-[.9rem] font-semibold relative z-20">
        {verificandoAutenticacion ? null : usuario ? (
          <>
            <li className="hover:text-[#01C29A] mr-4">
              <Link href="/">Inicio</Link>
            </li>
            <li
              className="hover:text-[#01C29A] mr-4 relative z-20 flex items-end cursor-pointer"
              onMouseEnter={handleMouseEnter}
            >
              <p>Mi cuenta</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                className="-ml-[.1rem] mb-[.1rem] fill-slate-700 hidden md:block"
                viewBox="0 0 24 24"
              >
                <path d="M16.939 7.939 12 12.879l-4.939-4.94-2.122 2.122L12 17.121l7.061-7.06z" />
              </svg>
            </li>
            {showPerfil && (
              <ul
                onMouseLeave={handleMouseLeave}
                className="absolute w-[220px] top-10 z-10 flex flex-col items-start bg-white shadow-md"
              >
                <li className="p-2 flex items-center transition-all w-[100%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="30"
                    fill="#01C29A"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                  </svg>
                  <p className="ml-1">{usuario?.name || usuario?.username}</p>
                </li>
                <Logout />
              </ul>
            )}
          </>
        ) : (
          <>
            <li className="hover:text-[#01C29A] mr-4">
              <Link href="/ingresar">Ingresar</Link>
            </li>
            <li className="hover:text-[#01C29A]">
              <Link href="/registrar">Registrarme</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;