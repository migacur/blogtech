import imagen from '../../../public/404.png'
import  Image  from 'next/image';

const NotFound = ({message}) => {
  return (
    <div className="mt-10 py-2 flex flex-col place-content-center place-items-center col-span-3">
                <Image
                src={imagen}
                width={400}
                height={250}
                 alt='404'
                className="object-cover pointer-events-none"
                />
     <h1 className="text-[#404040] text-2xl uppercase font-bold mt-[-120px]"> {message} </h1>
    </div>
  )
}

export default NotFound