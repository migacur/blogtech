import { Suspense } from 'react';
import Trend from "./Trend";
import Spinner from './spinner/Spinner';

const API_URL = process.env.API_URL;

export async function loadTrend() {
    try {
        const res = await fetch(`${API_URL}/api/post/trend`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        if (!Array.isArray(data)) {
            throw new Error("Se esperaba un listado");
        }

        return data;
    } catch (error) {
        console.error("Error cargando data:", error);
        return null; 
    }
}

async function CardTedencia() {
    const tendencias = await loadTrend();

    return (
        <div className="pl-3 lg:mt-6 md:mt-6 sm:mt-0 sm:w-full sm:pl-2 lg:pl-0">
            <div className="mb-2 ml-0 md:ml-3 flex place-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 fill-[#01C29A]" width="24" height="24" viewBox="0 0 24 24"><path d="m10 10.414 4 4 5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4-7.707 7.707 1.414 1.414z"/></svg>
                <h2 className="text-[#404040] font-bold ">Más populares</h2>
            </div>

            <Suspense fallback={ <Spinner/> }>
                <Trend tendencias={tendencias} />
            </Suspense>
        </div>
    );
}

export default CardTedencia;