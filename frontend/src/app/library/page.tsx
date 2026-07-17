"use client";

import { useEffect, useState } from "react";

interface Document {
  filename: string;
  pages: number;
  chunks: number;
}

export default function LibraryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  async function loadDocuments() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/documents"
      );

      const data = await response.json();

      setDocuments(data.documents);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  async function deleteDocument(filename: string) {
    const confirmDelete = confirm(
      `Delete "${filename}"?`
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `http://127.0.0.1:8000/documents/${encodeURIComponent(filename)}`,
        {
          method: "DELETE",
        }
      );

      loadDocuments();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Research Library
      </h1>

      {documents.length === 0 ? (
        <p>No research papers uploaded.</p>
      ) : (
        <div className="space-y-4">

          {documents.map((doc) => (

            <div
              key={doc.filename}
              className="border rounded-lg p-5 shadow bg-white"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-lg font-semibold">
                    {doc.filename}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {doc.pages} Pages • {doc.chunks} Chunks
                  </p>

                </div>

                <button
                  onClick={() => deleteDocument(doc.filename)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}