import Card from "@/app/components/Card";
import CardTedencia from "@/app/components/CardTedencia";
import Category from "@/app/components/Category";
import { Suspense } from 'react';
import Spinner from "@/app/components/spinner/Spinner";
import CategoryList from "@/app/components/CategoryList";

const API_URL = process.env.API_URL;

export async function loadData(name) {
    const res = await fetch(`${API_URL}/api/post/category/${name}`);
    const data = await res.json();
    return data;
}

export default async function Page({ params }) {
    const posts = await loadData(params.name);
 
    if (!posts || !Array.isArray(posts)) {
        return <p>No se encontraron publicaciones para esta categoría</p>;
    }

    const nombreCategoria = posts[0]?.nombre_categoria;

    return (
        <>
            <div className="col-span-2 mt-9">
                <Card posts={posts} />
            </div>
            <div className="col-span-1 mt-9">
                <Suspense fallback={<Spinner />}>
                    <CategoryList param={nombreCategoria} />
                </Suspense>
                <CardTedencia />
            </div>
        </>
    );
}