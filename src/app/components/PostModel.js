"use client";
import Image from "next/image";
import { CircleX } from "lucide-react";

export default function PostModel({ post, onClose, onNext, onPrev }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-gray-700/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/90 text-white rounded-lg overflow-y-auto max-w-4xl w-11/12 max-h-[90vh] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <button onClick={onClose} className="hover:text-red-300" aria-label="Close">
            <CircleX />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-64 rounded-md overflow-hidden border border-white/10">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 space-y-3">
            <p className="text-gray-200">{post.plaintextBody}</p>
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category, i) => (
                <span key={`${post.id}-${category}-${i}`} className="text-xs px-2.5 py-0.5 rounded border border-white/15 bg-white/5">
                  {category.title}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onPrev} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Prev</button>
              <button onClick={onNext} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}