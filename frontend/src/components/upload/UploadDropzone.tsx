"use client";

import { useRef } from "react";
import { UploadCloud, FileText } from "lucide-react";

interface UploadDropzoneProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

export default function UploadDropzone({
  selectedFile,
  setSelectedFile,
}: UploadDropzoneProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const file = files[0];

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setSelectedFile(file);
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className="
      cursor-pointer
      rounded-3xl
      border-2
      border-dashed
      border-primary/30
      bg-card
      p-16
      text-center
      hover:border-primary
      hover:bg-primary/5
      transition-all
      duration-300
      "
    >

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      {!selectedFile ? (

        <>

          <UploadCloud className="mx-auto h-20 w-20 text-primary mb-6"/>

          <h2 className="text-2xl font-bold">

            Drag & Drop PDF Here

          </h2>

          <p className="text-muted-foreground mt-3">

            or click anywhere to browse files

          </p>

          <p className="mt-8 text-sm text-muted-foreground">

            Supported Format: PDF

          </p>

        </>

      ) : (

        <>

          <FileText className="mx-auto h-20 w-20 text-green-600 mb-6"/>

          <h2 className="text-2xl font-bold">

            {selectedFile.name}

          </h2>

          <p className="text-muted-foreground mt-3">

            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB

          </p>

          <p className="mt-5 text-green-600 font-medium">

            Ready to Upload

          </p>

        </>

      )}

    </div>
  );
}