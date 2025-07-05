"use client"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import Spinner from "./spinner/Spinner"
import { useRouter } from "next/navigation"
import EyeIcon from "./Svg/EyeIcon"
import EyeHideIcon from "./Svg/EyeHideIcon"
import { ContextoUsuario } from "@/context/authContext"

const FormLogin = () => {


  const [user, setUser] = useState({});
  const { usuario,guardarUsuario, autenticarUser } = useContext(ContextoUsuario);
  const [isLoad, setIsLoad] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const router = useRouter();

  useEffect(() => {
      if(usuario) return;
      const verificarUsuario = async () => {
        const autenticado = await autenticarUser();
        if (autenticado)  return window.location.href = '/';
      };
      verificarUsuario();
    }, [usuario,autenticarUser, router]);

  const showPassword = () => setIsPassword(!isPassword);

  const leerInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    if (!username || !password) {
      Swal.fire({
        title: 'Ha ocurrido un error',
        text: 'Ambos campos son obligatorios',
        icon: 'error',
      });
      return;
    }
    setIsLoad(false);

    try {
      const response = await fetch('/api/users/auth', {
        method: "POST",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
 
      if (response.ok) {
  
        Swal.fire({
          title: "Has iniciado sesión",
          text: `Bienvenido ${res.usuario.name}`,
          icon: "success",
        });
        setIsLoad(true);
        guardarUsuario(res.usuario)
      //  autenticarUser(); // Llama a autenticarUser una sola vez
        return window.location.href = '/';
      } else {
        Swal.fire({
          title: 'Ha ocurrido un error',
          text: res.msg,
          icon: 'error',
        });
        setIsLoad(true);
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: 'Ha ocurrido un error',
        text: 'Error al intentar iniciar sesión',
        icon: 'error',
      });
      setIsLoad(false);
    }
  };

  return (
    <form 
    method="POST" 
    action="/api/users/auth" 
    onSubmit={loginUser}
    className="text-[#404040] flex flex-col place-content-center p-3 place-items-center">
        <h1 className="font-bold text-center uppercase mt-5 mb-2 text-[1.2rem] rounded">Ingresa a tu cuenta</h1>
        <input 
        onChange={leerInput}
        name="username"
        className="w-[300px] py-1 px-2 mb-2 outline-none rounded bg-slate-200 shadow-sm" type="text" placeholder="Ingresa tu username"/>
        <div className="relative">
        <input 
         onChange={leerInput}
         name="password"
        className="w-[300px] py-1 px-2 outline-none rounded bg-slate-200 shadow-sm" type={isPassword? "password" : "text"} placeholder="Ingresa tu password"/>
      { isPassword ?
        <EyeIcon showPassword={showPassword}/> :
       <EyeHideIcon showPassword={showPassword}/>
       }
        </div>
        {!isLoad && <Spinner texto="Iniciando sesión..."/>}
        <input 
        className="w-[300px] mt-2 bg-[#01C29A] hover:bg-[#299680] text-[#fff] py-1 cursor-pointer uppercase font-bold rounded" type="submit" value="Ingresar"/>
    <Link href="/registrar" className="mt-1 text-[.9rem]">¿No tienes cuenta? Regístrate</Link>
    </form>
  )
}

export default FormLogin;
