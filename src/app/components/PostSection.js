"use client";
import { useMemo, useState } from "react";
import PostModel from "./PostModel";
import {createClient} from '@sanity/client';
import { useEffect } from "react";

const PostSection = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      useCdn: true,
      apiVersion: '2025-09-07',
    });

    client.fetch('*[_type == "post"]{title,_id,author->{_id,name}}')
    .then((data) => {
      setPosts(data);
      console.log("Fetched data: " + data[0].title);

    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });

  
  }, []);

  // keep storing the ID (number) — not the object
  const [selectedPost, setSelectedPost] = useState(null); // null | number

  // Resolve the post object whenever the ID changes
  const activePost = useMemo(
    () => (selectedPost == null ? null : posts.find(p => p.id === selectedPost) || null),
    [selectedPost, posts]
  );

  const handlePostClick = (id) => setSelectedPost(id);
  const handleCloseModal = () => setSelectedPost(null);

  // NON-CIRCULAR next/prev using the stored ID
  const handleNextPost = () => {
    if (selectedPost == null) return;
    const currentIndex = posts.findIndex(p => p.id === selectedPost);
    if (currentIndex === -1 || currentIndex === posts.length - 1) return; // at end → do nothing
    setSelectedPost(posts[currentIndex + 1].id);
  };

  const handlePrevPost = () => {
    if (selectedPost == null) return;
    const currentIndex = posts.findIndex(p => p.id === selectedPost);
    if (currentIndex <= 0) return; // at start (or not found) → do nothing
    setSelectedPost(posts[currentIndex - 1].id);
  };

  return (
    <section id="posts" className="px-4 py-32 sm:px-6">
      <h2 className="text-2xl font-bold mb-10 text-center">Featured Posts</h2>

      <div className="grid grid-cols-4 gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <button
            key={post._id}
            onClick={() => handlePostClick(post._id)}
            className="text-left bg-gray-700/30 backdrop-blur-sm p-4 border border-transparent rounded-lg transition-all duration-300 hover:border-gray-100 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-3">{post.title}</h3>

            {/* <div className="mb-5">
              {post.tags.map((tag, i) => (
                <span
                  key={`${post.id}-${tag}-${i}`}
                  className="inline-block border border-amber-50/25 bg-gray-600/50 text-red-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div> */}

            <p>{post._id}</p>
            <p>{post.author.name}</p>
            <p>{post.body}</p>
          </button>
        ))}
      </div>

      {activePost && (
        <PostModel
          post={activePost}
          onClose={handleCloseModal}
          onNext={handleNextPost}
          onPrev={handlePrevPost}
        />
      )}
    </section>
  );
};

export default PostSection;
