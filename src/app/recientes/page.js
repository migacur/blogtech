
import { Suspense } from "react";
import Card from "../components/Card";
import CardTedencia from "../components/CardTedencia";
import Category from "../components/Category";
import Loading from "../components/Loading";
import loadPost from "../helpers/loadData";

export const metadata = {
  title: "Post recientes"
};

async function page(){

  const posts = await loadPost()
 
  return (
    <>
    <div className="col-span-2 mt-9">
    <Suspense fallback={<Loading/>}>
    <Card posts={posts}/>
    </Suspense>
    </div>
     <div className="col-span-1 mt-9">
        <CardTedencia/>
        <Category/>
    </div>
   
  </>
  )
}

export default page