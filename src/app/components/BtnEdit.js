
import Link from "next/link";

const BtnEdit = ({post}) => {
  return (
    <Link href={`/editar/${post}`}
    className='w-[130px] flex place-content-center uppercase bg-blue-500 text-white py-1 px-4 mt-2 mb-1 rounded-md font-bold text-[.9rem] mr-2 transition-colors duration-300 transform hover:bg-blue-600'
    > 
    <svg className='mr-1 fill-white w-[22px] h-[22px]' 
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"/><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"/></svg>
      Editar
    </Link>
  )
}

export default BtnEdit