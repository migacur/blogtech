"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import EyeIcon from "./Svg/EyeIcon";
import EyeHideIcon from "./Svg/EyeHideIcon";
import { useRouter } from "next/navigation";
import { ContextoUsuario } from "@/context/authContext";

const FormRegister = () => {
  const { usuario, autenticarUser } = useContext(ContextoUsuario);
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [isPassword, setIsPassword] = useState(true);

  useEffect(() => {
    if(usuario) return;
    const verificarUsuario = async () => {
      const autenticado = await autenticarUser();
      if (autenticado) return router.push("/");
    };
    verificarUsuario();
  }, [usuario,autenticarUser, router]);

  const showPassword = () => setIsPassword(!isPassword)

  const leerInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registrarUser = async (e) => {
    e.preventDefault();

    const { username, password, password_repeat, email } = user;

    if (!username || !password || !password_repeat || !email) {
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Debes rellenar todos los campos",
        icon: "error",
      });
      return;
    }

    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Parsea la respuesta como JSON
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Usuario Registrado",
            text: "Ya puedes iniciar sesión",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Algo anda mal",
            text: res.msg,
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: error,
          icon: "error",
        });
      });
  };

  return (
    <form
      method="POST"
      action="/api/users"
      onSubmit={registrarUser}
      className="text-[#404040] flex flex-col place-content-center p-3 place-items-center"
    >
      <h1 className="font-bold text-center uppercase mt-5 mb-2 text-[1.2rem] rounded">
        Registrar cuenta
      </h1>
      <input
        onChange={leerInput}
        name="username"
        className="w-[300px] py-1 px-2 mb-2 outline-none rounded bg-slate-200 shadow-sm"
        type="text"
        placeholder="Ingresa tu username"
      />
      <div className="relative mb-2">
        <input
          onChange={leerInput}
          name="password"
          className="w-[300px] py-1 px-2 outline-none rounded bg-slate-200 shadow-sm"
          type={isPassword ? "password" : "text"}
          placeholder="Ingresa tu password"
        />
        {isPassword ? (
          <EyeIcon showPassword={showPassword} />
        ) : (
          <EyeHideIcon showPassword={showPassword} />
        )}
      </div>
      <div className="relative mb-2">
        <input
          onChange={leerInput}
          name="password_repeat"
          className="w-[300px] py-1 px-2 outline-none rounded bg-slate-200 shadow-sm"
          type={isPassword ? "password" : "text"}
          placeholder="Repite tu password"
        />
        {isPassword ? (
          <EyeIcon showPassword={showPassword} />
        ) : (
          <EyeHideIcon showPassword={showPassword} />
        )}
      </div>
      <input
        onChange={leerInput}
        name="email"
        className="w-[300px] py-1 px-2 mb-2 outline-none rounded bg-slate-200 shadow-sm"
        type="email"
        placeholder="Ingresa tu email"
      />
      <input
        className="w-[300px] mt-2 bg-[#01C29A] hover:bg-[#299680] text-[#fff] py-1 cursor-pointer uppercase font-bold rounded"
        type="submit"
        value="Registrarme"
      />
      <Link href="/ingresar" className="mt-1 text-[.9rem]">
        ¿Ya tienes cuenta? Ingresa
      </Link>
    </form>
  );
};

export default FormRegister;
