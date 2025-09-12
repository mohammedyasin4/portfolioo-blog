// app/page.jsx
import Link from "next/link";
import { client } from "@/sanity/client";

// GROQ query: fetch latest 12 posts
const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li key={post._id} className="hover:underline">
            <Link href={`/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
