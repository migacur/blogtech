"use client"
import { useRouter } from "next/navigation"

const BtnBack = () => {

 const router = useRouter()

  return (
     <button 
     className="mb-2 bg-[#01C29A] hover:bg-[#2dac92] text-[#fff] w-[180px] rounded-md py-1 text-[.85rem] font-semibold hidden md:block sm:hidden"
     onClick={()=> router.back()}>Ir a la página anterior</button>
  )
    }

export default BtnBack