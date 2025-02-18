"use client"
import React, { useContext, useEffect, useState } from 'react';
import User from './Svg/User';
import { ContextoUsuario } from '@/context/authContext';
import { useRouter } from "next/navigation";
import Spinner from './spinner/Spinner';
import Link from 'next/link';

const Perfil = ({ user }) => {
  const { usuario, autenticarUser } = useContext(ContextoUsuario);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verificarUsuario = async () => {
      const autenticado = await autenticarUser();
      if (!autenticado) {
        router.push("/ingresar");
      }
      setIsLoading(false);
    };

    if (!usuario) {
      verificarUsuario();
    } else {
      setIsLoading(false);
    }
  }, [usuario, autenticarUser, router]);

  if (isLoading) {
    return <Spinner texto="Cargando perfil..." />;
  }

  if (!user) {
    return <div>No se pudo cargar el perfil del usuario.</div>;
  }

  return (
    <div className="col-span-6 mt-9 w-[100%] ">
      <div className="mt-6 py-4 flex flex-col justify-center items-center rounded-md ">
        <User w={85} h={85} />
        <div>
          <p className='font-bold text-gray-500 text-[1.1rem]'>{user.username}</p>
        </div>
        <div className='flex text-[1.2rem]'>
          <span className='text-[#01C29A] uppercase font-bold text-[1.1rem]'> {user.rango_usuario} </span>
        </div>
        <div className='flex text-[.9rem]'>
          <p className='font-bold text-gray-500 mr-[.1rem]'>Email:</p>
          <span> {user.email} </span>
        </div>
        <div className='flex flex-col items-center mt-2'>
          <p className='text-[#01C29A] font-bold uppercase'>Publicaciones</p> <span>-</span>
        </div>
        <div className='flex flex-col items-center mt-2'>
          <p className='text-[#01C29A] font-bold uppercase'>Votos realizados</p> <span>{user.votos_usuario} </span>
        </div>
        <Link 
          href="/publicar"
          className='bg-[#01C29A] py-1 px-6 mt-2 text-white rounded-md hover:bg-[#19a78a] transition-all'
        >
          Publicar
        </Link>
      </div>
    </div>
  );
};

export default Perfil;