"use client";
import { useState } from "react";
import Image from "next/image";
import { CircleX, Pencil } from "lucide-react";
import EditModel from "./EditModel";

export default function PostModel({ post, onEdit, onClose }) {
  const [showEdit, setShowEdit] = useState(false);
  const [localPost, setLocalPost] = useState(post);

  const handleEditSave = (updatedPost) => {
    setLocalPost(updatedPost);
    if (onEdit) onEdit(updatedPost);
  };

  if (!localPost) return null;

  return (
    <div className="fixed inset-0 bg-gray-700/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/90 text-white rounded-lg overflow-y-auto max-w-4xl w-11/12 max-h-[90vh] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{localPost.title}</h2>
          <div className="flex gap-6">
            <button
              onClick={() => setShowEdit(true)}
              className="hover:text-red-300"
              aria-label="Edit"
              title="Edit">
              <Pencil color="Green" />
            </button>
            <button 
              onClick={onClose} 
              className="hover:text-red-300" 
              aria-label="Close" 
              title="Close">
              <CircleX color="Red" />
            </button>
          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-64 rounded-md overflow-hidden border border-white/10">
            <Image
              src={localPost.imageUrl}
              alt={localPost.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Text */}
          <div className="md:w-1/2 space-y-3">
            <p className="text-gray-200">{localPost.plaintextBody}</p>
            <div className="flex flex-wrap gap-2">
              {localPost.categories.map((category, i) => (
                <span key={`${localPost.id}-${category}-${i}`} className="text-xs px-2.5 py-0.5 rounded border border-white/15 bg-white/5">
                  {category.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        {showEdit && (
          <EditModel
            post={localPost}
            onClose={() => setShowEdit(false)}
            onSave={handleEditSave}
          />
        )}
      </div>
    </div>

  );
}