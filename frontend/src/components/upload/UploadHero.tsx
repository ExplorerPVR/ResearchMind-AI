"use client";

import { UploadCloud } from "lucide-react";

export default function UploadHero() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white p-10 shadow-xl">
      <div className="flex items-center gap-6">
        <div className="rounded-2xl bg-white/20 p-5 backdrop-blur">
          <UploadCloud className="h-12 w-12" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            Upload Research Papers
          </h1>

          <p className="mt-3 text-lg text-indigo-100">
            Build your AI knowledge base by uploading research papers.
          </p>
        </div>
      </div>
    </section>
  );
}