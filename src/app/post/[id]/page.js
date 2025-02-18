// app/post/[id]/page.js

import PostWrapper from "@/app/components/PostWrapper";

export default function Page({ params }) {
  return <PostWrapper params={params} />;
}