"use client";

import { Sparkles } from "lucide-react";

export default function ChatWelcome() {

  return (

    <div className="rounded-3xl border bg-card p-12 shadow text-center">

      <Sparkles className="mx-auto h-14 w-14 text-primary"/>

      <h2 className="text-3xl font-bold mt-6">

        Welcome to ResearchMind AI

      </h2>

      <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">

        Upload research papers and ask questions in natural language.
        Every answer is generated using your uploaded documents.

      </p>

    </div>

  );

}