
const Detalles = ({post}) => {
  return (
    <div className=" text-slate-700 w-full bg-[#01C29A] mt-4  border rounded-md shadow-sm ">
      
      <div className="w-[96%]  md:w-[65%] flex-wrap mx-auto flex flex-col md:flex-row justify-center md:justify-between place-items-center">
       
        <div className="mb-3 flex flex-col justify-center items-center mt-1 ">
        <div className="mt-1 flex items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#404040] mr-1 "
        width="22" height="22" viewBox="0 0 24 24"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"/></svg>
        <h4 className="my-1 font-bold uppercase text-[#404040] text-[.8rem]">
          Autor
        </h4>
        </div>
        <span className="ml-1 text-[.9rem]  text-white font-bold">{post.autor}</span>
        </div>

        <div className="mb-3 flex flex-col justify-center items-center mt-1">
          <div className="mt-1 flex items-center ">
          <svg xmlns="http://www.w3.org/2000/svg"  className="fill-[#404040] mr-1"
        width="22" height="22" viewBox="0 0 24 24"><path d="M19 4h-3V2h-2v2h-4V2H8v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM5 20V7h14V6l.002 14H5z"/><path d="M7 10v2h10V9H7z"/></svg>
          <h4 className="my-1 font-bold  uppercase text-[#404040] text-[.8rem]">
          Fecha
        </h4>
          </div>
        <span className="ml-1 text-[.9rem]  text-white font-bold">{post.fecha_publicado.slice(0,10)}</span>
        </div>

        <div className="mb-3 flex flex-col justify-center items-center mt-1">
          <div className="mt-1 flex items-center ">
          <svg xmlns="http://www.w3.org/2000/svg"  className="fill-[#404040] mr-1 " 
        width="22" height="22" viewBox="0 0 24 24"><path d="M21 8c-.202 0-4.85.029-9 2.008C7.85 8.029 3.202 8 3 8a1 1 0 0 0-1 1v9.883a1 1 0 0 0 .305.719c.195.188.48.305.729.28l.127-.001c.683 0 4.296.098 8.416 2.025.016.008.034.005.05.011.119.049.244.083.373.083s.254-.034.374-.083c.016-.006.034-.003.05-.011 4.12-1.928 7.733-2.025 8.416-2.025l.127.001c.238.025.533-.092.729-.28.194-.189.304-.449.304-.719V9a1 1 0 0 0-1-1zM4 10.049c1.485.111 4.381.48 7 1.692v7.742c-3-1.175-5.59-1.494-7-1.576v-7.858zm16 7.858c-1.41.082-4 .401-7 1.576v-7.742c2.619-1.212 5.515-1.581 7-1.692v7.858z"/><circle cx="12" cy="5" r="3"/></svg>
          <h4 className=" font-bold uppercase  text-[#404040] text-[.8rem]">
          Visitas
        </h4>
          </div>
        <span className="ml-1 text-[.9rem]  text-white font-bold">{post.visitas}</span> 
        </div>       
        </div>
        
        
        

      
      </div>
  )
}

export default Detalles