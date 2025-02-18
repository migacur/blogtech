import CardTedencia from "./components/CardTedencia";
import Card from "./components/Card";
import { loadPost } from "./helpers/loadData";
import Category from "./components/Category";
import { Suspense } from 'react';
import Spinner from "./components/spinner/Spinner";
import CategoryList from "./components/CategoryList";

export default async function Home() {
  const posts = await loadPost();

  return (
    <>
      <div className="col-span-2 max-md:col-span-3 mt-9">
        <Suspense fallback={ <Spinner/> }>
          <Card posts={posts} />
        </Suspense>
      </div>
      <div className="col-span-2 md:col-span-1 mt-9">
        <CardTedencia />
        <CategoryList />
      </div>
    </>
  );
}