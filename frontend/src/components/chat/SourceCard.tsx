"use client";

import { FileText, ExternalLink } from "lucide-react";

interface Props {

  filename: string;

  page: number;

  score?: number;

}

export default function SourceCard({

  filename,

  page,

  score = 0.94,

}: Props) {

  return (

    <div className="rounded-2xl border bg-card p-5 shadow hover:shadow-lg transition">

      <div className="flex gap-4">

        <FileText className="text-primary"/>

        <div>

          <h3 className="font-semibold">

            {filename}

          </h3>

          <p className="text-sm text-muted-foreground">

            Page {page}

          </p>

          <p className="text-xs text-primary mt-2">

            Confidence {(score * 100).toFixed(0)}%

          </p>

        </div>

      </div>

      <button className="mt-4 flex gap-2 text-primary">

        <ExternalLink className="w-4 h-4"/>

        Open PDF

      </button>

    </div>

  );

}