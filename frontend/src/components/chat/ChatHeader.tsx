"use client";

import { Bot } from "lucide-react";

export default function ChatHeader() {

  return (

    <section className="rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white p-10 shadow-xl">

      <div className="flex items-center gap-5">

        <div className="rounded-2xl bg-white/20 p-4">

          <Bot className="h-10 w-10"/>

        </div>

        <div>

          <h1 className="text-4xl font-bold">

            AI Research Assistant

          </h1>

          <p className="mt-2 text-indigo-100">

            Ask questions, summarize papers, compare research and generate accurate answers using Retrieval-Augmented Generation.

          </p>

        </div>

      </div>

    </section>

  );

}