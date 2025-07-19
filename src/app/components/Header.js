"use client"
import Link from "next/link"
import Navbar from "./Navbar"
import Image from "next/image"
import logo from '../../../public/logo.webp'
import { useState } from "react"

const Header = () => {
    const [showPerfil,setShowPerfil] = useState(false)
    const [isOpen,setIsOpen]=useState(false)
    const handleMouseLeave = () => setShowPerfil(false);

    const showMenu = () => setIsOpen(!isOpen)

  return (
    <header onMouseLeave={handleMouseLeave}
    className="px-2 md:px-4 py-3 text-[#404040] bg-white text-center text-1xl 
    flex place-content-between place-items-center border-b-2 fixed z-50 w-full "
    >
    <div className="flex place-items-center relative ">
    <svg
    onClick={showMenu} 
    xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#404040"
     className="cursor-pointer mr-1 sm:block md:block lg:hidden"
    viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
      <Link href="/">
      <Image
  priority={true}
  src={logo}
  width={150}
  height={150}
  alt="Logo"
/>
      </Link >
      <ul  onClick={showMenu}
     className={`fixed mt-[.65rem] top-12 left-0 h-full w-64 bg-[#01C29A] text-white transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}
     >
      <Link href="/categoria/Tecnología">
      <li className="mb-1 hover:bg-[#404040] py-2 text-start uppercase font-bold pl-3 "> 
        Tecnología
      </li>
      </Link> 
      <Link href="/categoria/Videojuegos">
      <li className="mb-1 hover:bg-[#404040] py-2 text-start uppercase font-bold pl-3 "> 
        Videojuegos
      </li>
      </Link> 
      <Link href="/categoria/Cine">
        <li className="mb-1 hover:bg-[#404040] py-2 text-start uppercase font-bold pl-3"> 
        Cine
      </li>
      </Link>
      <Link href="/categoria/Televisión">
        <li className="mb-1 hover:bg-[#404040] py-2 text-start uppercase font-bold pl-3"> 
     Televisión
      </li>
      </Link> 
      <Link href="/categoria/Deportes">
        <li className="mb-1 hover:bg-[#404040] py-2 text-start uppercase font-bold pl-3"> 
        Deportes
      </li>
      </Link> 
      <Link href="/categoria/Música">
        <li className=" hover:bg-[#404040] py-2 text-start uppercase font-bold pl-3"> 
      Música
      </li>
      </Link> 
      </ul>
      </div>
      <Navbar setShowPerfil={setShowPerfil} showPerfil={showPerfil} handleMouseLeave={handleMouseLeave} />
    </header>
  )
}

export default Header