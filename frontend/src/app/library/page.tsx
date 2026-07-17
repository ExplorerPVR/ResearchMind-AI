"use client";

import { useEffect, useState } from "react";

interface Document {
  filename: string;
  uploadedAt: string;
}

export default function LibraryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("researchmind_documents");

    if (saved) {
      setDocuments(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Research Library
      </h1>

      {documents.length === 0 ? (
        <div className="text-gray-500">
          No research papers uploaded yet.
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="font-semibold text-lg">
                {doc.filename}
              </h2>

              <p className="text-sm text-gray-500">
                Uploaded:
                {" "}
                {new Date(doc.uploadedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}