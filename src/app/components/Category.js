import Link from "next/link";

const API_URL = process.env.API_URL;

const normalizedAPI_URL = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;

export async function loadCategory() {
    try {
        const res = await fetch(`${normalizedAPI_URL}api/post/category`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of categories");
        }

        return data;
    } catch (error) {
        console.error("Error loading categories:", error);
        return [];
    }
}

export async function Category({ param }) {
    const categorias = await loadCategory();

    if (!categorias || !Array.isArray(categorias)) {
        return <p>Error al mostrar las categorías</p>;
    }

    return (
        <div className="mt-6 ml-3 hidden sm:hidden md:hidden lg:block">
            <h3 className="text-[#01C29A] text-[.8rem] uppercase font-bold mb-2">Categorías</h3>
            <ul className="text-[#404040]">
                {categorias.map(categoria => (
                    <Link
                        href={`/categoria/${categoria.nombre_categoria}`}
                        key={categoria.categoria_id}
                    >
                        <li
                            className={`cursor-pointer py-1 border-b-2 hover:bg-[#01C29A] rounded-md hover:px-2 hover:text-[#fff] ${param === categoria.nombre_categoria ? 'bg-[#01C29A] font-bold px-2 text-[#fff]' : 'bg-[#FCFBFE] '}`}
                        >
                            {categoria.nombre_categoria}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Category;