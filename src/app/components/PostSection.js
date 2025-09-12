"use client";
import { useMemo, useState, useEffect } from "react";
import PostModel from "./PostModel";
import {createClient} from '@sanity/client';

const PostSection = () => {

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // null | number

  useEffect(() => {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      useCdn: true,
      apiVersion: '2025-09-07',
    });

    client.fetch(`*[_type == "post"]{
      title,
      slug,
      _id,
      author->{_id, name},
      'plaintextBody':pt::text(body),
      'imageUrl': mainImage.asset->url,
      publishedAt,
      'categories': coalesce(categories[]->{_id, slug, title})
      }`)
    .then((data) => {
      setPosts(data);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });

  
  }, []);


  const handlePostClick = (id) => {
    setSelectedPost(posts.find(p => p._id === id));
  };
  const handleCloseModal = () => setSelectedPost(null);

  const handleNextPost = () => {
    if (selectedPost == null) return;
    let currentIndex = posts.findIndex(p => p._id === selectedPost._id);
    if (currentIndex === -1 || currentIndex === posts.length - 1) 
    {
      currentIndex = 0;
      setSelectedPost(posts[currentIndex]);
      return;
    };
    setSelectedPost(posts[currentIndex + 1]);
  };

  const handlePrevPost = () => {
    if (selectedPost == null) return;
    let currentIndex = posts.findIndex(p => p._id === selectedPost._id);
    if (currentIndex <= 0)
    {
      currentIndex = posts.length - 1;
      setSelectedPost(posts[currentIndex]);
      return;
    }
    setSelectedPost(posts[currentIndex - 1]);
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

            <div className="mb-5">
              {post.categories.map((category, i) => (
                <span
                  key={`${post.id}-${category}-${i}`}
                  className="inline-block border border-amber-50/25 bg-gray-600/50 text-red-300 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {category.title}
                </span>
              ))}
            </div>
            <p>{post.slug.current}</p>
          </button>
        ))}
      </div>

      {selectedPost && (
        <PostModel
          post={selectedPost}
          onClose={handleCloseModal}
          onNext={handleNextPost}
          onPrev={handlePrevPost}
        />
      )}
    </section>
  );
};

export default PostSection;