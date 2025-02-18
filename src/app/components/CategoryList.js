"use client"

import Link from "next/link"

const CategoryList = ({param}) => {
  return (
    <div className="mt-6 ml-3 hidden sm:hidden md:hidden lg:block">
    <h3 className="text-[#01C29A] text-[.8rem] uppercase font-bold mb-2">Categorías</h3>
    <ul>
    <Link href="/categoria/Tecnología">
      <li className={`"bg-white mb-1 text-[.9rem] hover:bg-[#01C29A] border-b-[.1rem] border-gray-200 rounded-md text-[#404040] hover:text-white py-1 text-start uppercase font-bold pl-1 hover:pl-3  ${param === "Tecnología" && `bg-[#01C29A] text-white pl-3`}`}> 
        Tecnología
      </li>
      </Link> 
      <Link href="/categoria/Videojuegos">
      <li className={`"bg-white mb-1 text-[.9rem] hover:bg-[#01C29A] border-b-[.1rem] border-gray-200 rounded-md text-[#404040] hover:text-white py-1 text-start uppercase font-bold pl-1 hover:pl-3  ${param === "Videojuegos" && `bg-[#01C29A] text-white pl-3`}`}> 
        Videojuegos
      </li>
      </Link> 
      <Link href="/categoria/Cine">
        <li className={`"bg-white mb-1 text-[.9rem] hover:bg-[#01C29A] border-b-[.1rem] border-gray-200rounded-md text-[#404040] hover:text-white py-1 text-start uppercase font-bold pl-1 hover:pl-3  ${param === "Cine" && `bg-[#01C29A] text-white pl-3`}`}> 
        Cine
      </li>
      </Link>
      <Link href="/categoria/Televisión">
        <li className={`"bg-white mb-1 text-[.9rem] hover:bg-[#01C29A] border-b-[.1rem] border-gray-200 rounded-md text-[#404040] hover:text-white py-1 text-start uppercase font-bold pl-1 hover:pl-3  ${param === "Televisión" && `bg-[#01C29A] text-white pl-3`}`}> 
     Televisión
      </li>
      </Link> 
      <Link href="/categoria/Deportes">
        <li className={`"bg-white mb-1 text-[.9rem] hover:bg-[#01C29A] border-b-[.1rem] border-gray-200 rounded-md text-[#404040] hover:text-white py-1 text-start uppercase font-bold pl-1 hover:pl-3  ${param === "Deportes" && `bg-[#01C29A] text-white pl-3`}`}> 
        Deportes
      </li>
      </Link> 
      <Link href="/categoria/Música">
        <li className={`"bg-white mb-1 text-[.9rem] hover:bg-[#01C29A]  rounded-md text-[#404040] hover:text-white py-1 text-start uppercase font-bold pl-1 hover:pl-3  ${param === "Música" && `bg-[#01C29A] text-white pl-3`}`}> 
      Música
      </li>
      </Link> 
      </ul>
</div>
  )
}

export default CategoryList