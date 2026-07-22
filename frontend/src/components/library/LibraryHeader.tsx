"use client";

import { LibraryBig } from "lucide-react";

export default function LibraryHeader() {

  return (

    <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white p-10 shadow-xl">

      <div className="flex items-center gap-5">

        <div className="rounded-2xl bg-white/20 p-4">

          <LibraryBig className="h-10 w-10"/>

        </div>

        <div>

          <h1 className="text-4xl font-bold">

            Research Library

          </h1>

          <p className="text-blue-100 mt-2">

            Browse, search and manage all uploaded research papers.

          </p>

        </div>

      </div>

    </section>

  );

}