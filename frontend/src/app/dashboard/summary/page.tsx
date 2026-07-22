"use client";

import { useEffect, useState } from "react";
import ExportButton from "@/components/upload/ExportButton";

import {
  FileText,
  Sparkles,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

interface Document {
  filename: string;
}

export default function SummaryPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selected, setSelected] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);
    async function loadDocuments() {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/documents"
      );

      const data = await res.json();

      setDocuments(data.documents || []);

      if (data.documents?.length > 0) {
        setSelected(data.documents[0].filename);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function generateSummary() {
    if (!selected) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: selected,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSummary(data.summary);
      } else {
        setSummary(
          data.detail || "Unable to generate summary."
        );
      }
    } catch (error) {
      console.error(error);

      setSummary("Could not connect to backend.");
    }

    setLoading(false);
  }
    return (
    <div className="mx-auto max-w-7xl space-y-10">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-10 py-14 text-white shadow-2xl">

        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-3xl">

            <div className="mb-6 flex items-center gap-4">

              <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">

                <BrainCircuit className="h-10 w-10" />

              </div>

              <div>

                <h1 className="text-4xl font-extrabold">

                  AI Research Summary

                </h1>

                <p className="mt-2 text-lg text-white/90">

                  Instantly generate concise, structured and AI-powered
                  summaries from your uploaded research papers.

                </p>

              </div>

            </div>

            <div className="flex flex-wrap gap-4">

              <div className="rounded-full bg-white/20 px-5 py-2 backdrop-blur">

                ⚡ Gemini AI

              </div>

              <div className="rounded-full bg-white/20 px-5 py-2 backdrop-blur">

                📄 Smart Summarization

              </div>

              <div className="rounded-full bg-white/20 px-5 py-2 backdrop-blur">

                🚀 Export Ready

              </div>

            </div>

          </div>

          <Sparkles className="hidden h-32 w-32 text-white/40 lg:block animate-pulse" />

        </div>

      </section>

      {/* ================= MAIN CARD ================= */}

      <div className="rounded-3xl border border-border bg-card/95 backdrop-blur p-8 shadow-2xl">

        <div className="mb-8 flex items-center gap-3">

          <FileText className="h-7 w-7 text-primary" />

          <h2 className="text-2xl font-bold">

            Generate Research Summary

          </h2>

        </div>

        {documents.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-border p-12 text-center">

            <FileText className="mx-auto mb-5 h-12 w-12 text-muted-foreground" />

            <h3 className="text-xl font-semibold">

              No Research Papers Found

            </h3>

            <p className="mt-2 text-muted-foreground">

              Upload a PDF first from the Upload section.

            </p>

          </div>

        ) : (

          <>
                      <div className="grid gap-6 lg:grid-cols-5">

              <div className="lg:col-span-4">

                <label className="mb-2 block text-sm font-semibold">

                  Select Research Paper

                </label>

                <select
                  value={selected}
                  disabled={loading}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-5 py-4 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >

                  {documents.map((doc) => (

                    <option
                      key={doc.filename}
                      value={doc.filename}
                    >

                      {doc.filename}

                    </option>

                  ))}

                </select>

              </div>

              <div className="flex items-end">

                <button
                  onClick={generateSummary}
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
                >

                  {loading ? (

                    "Generating..."

                  ) : (

                    <>
                      Generate Summary
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>

                  )}

                </button>

              </div>

            </div>

            {loading && (

              <div className="mt-8 rounded-2xl border border-border bg-background p-8 shadow-lg">

                <div className="flex items-center gap-5">

                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>

                  <div>

                    <h3 className="font-semibold">

                      ResearchMind AI is analysing your paper...

                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">

                      Extracting key ideas, methodology, findings and conclusions.

                    </p>

                  </div>

                </div>

              </div>

            )}

            {summary && (

              <div className="mt-10 space-y-6">

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">

                      AI Generated Summary

                    </h2>

                    <p className="text-muted-foreground">

                      Generated using ResearchMind AI

                    </p>

                  </div>

                  <ExportButton
                    title="ResearchMind_Summary"
                    content={summary}
                  />

                </div>

                <div className="rounded-3xl border border-border bg-background p-8 shadow-xl">

                  <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap leading-8">

                    {summary}

                  </div>

                </div>

              </div>

            )}

          </>

        )}

      </div>

    </div>

  );

}