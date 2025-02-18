import FormEdit from "@/app/components/FormEdit"
import NotFound from "@/app/components/NotFound"
import { showPostId } from "@/app/helpers/showPostId"

async function page ({params}){

const post = await showPostId(params.id)

if(!post) return <NotFound message="Post no encontrado"/>

  return (
    <div className='col-span-3 mt-9 text-[#404040]'>
        <FormEdit post={post}/>
    </div>
  )
}

export default page