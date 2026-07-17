"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ PDF uploaded successfully!");
      } else {
        setMessage("❌ " + data.detail);
      }
    } catch (err) {
      setMessage("❌ Could not connect to backend.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Upload Research Paper</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files) {
            setFile(e.target.files[0]);
          }
        }}
        className="mb-4"
      />

      <br />

      <button
        onClick={uploadFile}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Upload PDF
      </button>

      <p className="mt-4">{message}</p>
    </div>
  );
}