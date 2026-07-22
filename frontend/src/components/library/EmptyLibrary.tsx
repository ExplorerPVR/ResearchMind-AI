"use client";

import { LibraryBig } from "lucide-react";

export default function EmptyLibrary() {

  return (

    <div className="rounded-3xl border bg-card shadow p-16 text-center">

      <LibraryBig className="mx-auto h-20 w-20 text-muted-foreground"/>

      <h2 className="text-2xl font-bold mt-6">

        No Research Papers Found

      </h2>

      <p className="text-muted-foreground mt-3">

        Upload your first paper to start building your AI-powered library.

      </p>

    </div>

  );

}