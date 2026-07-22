"use client";

import { Loader2 } from "lucide-react";

interface UploadProgressProps {
  uploading: boolean;
  progress: number;
}

export default function UploadProgress({
  uploading,
  progress,
}: UploadProgressProps) {

  if (!uploading) return null;

  return (

    <div className="rounded-3xl border bg-card shadow-lg p-8">

      <div className="flex items-center gap-3 mb-6">

        <Loader2 className="h-6 w-6 animate-spin text-primary" />

        <div>

          <h3 className="font-semibold text-lg">

            Uploading Research Paper...

          </h3>

          <p className="text-sm text-muted-foreground">

            Please wait while we process your document.

          </p>

        </div>

      </div>

      {/* Progress Bar */}

      <div className="w-full h-4 rounded-full bg-muted overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="flex justify-between mt-3 text-sm">

        <span>Uploading...</span>

        <span>{progress}%</span>

      </div>

    </div>

  );

}