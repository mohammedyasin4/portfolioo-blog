"use client";
import { useState } from "react";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.NEXT_PUBLIC_SANITY_API_DEV_TOKEN,
  useCdn: false,
  apiVersion: "2025-09-07",
});

const toBlockContent = (text) => [
  {
    _key: generateUniqueKey("block"),
    style: 'normal',
    _type: 'block',
    children: [
      {
        _type: 'span',
        marks: [],
        text: text,
      },
    ],
    markDefs: [],
  },
];

function generateUniqueKey(prefix = "key") {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

export default function EditModal({ post, onClose, onSave }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.plaintextBody);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await client
        .patch(post._id)
        .set({ title, body: toBlockContent(body) })
        .commit();
      onSave({ ...post, title, plaintextBody: body });
      onClose();
    } catch (err) {
      alert("Error updating post");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Post</h3>
        <input
          className="w-full border rounded p-2 mb-4"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={6}
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Body"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}