// app/post/[id]/page.js

import PostWrapper from "@/app/components/PostWrapper";

export const revalidate = 60;

export default function Page({ params }) {
  return <PostWrapper params={params} />;
}