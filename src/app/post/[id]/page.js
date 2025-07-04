// app/post/[id]/page.js

import PostWrapper from "@/app/components/PostWrapper";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default function Page({ params }) {
  return <PostWrapper params={params} />;
}