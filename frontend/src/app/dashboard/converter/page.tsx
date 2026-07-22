"use client";

import { useEffect, useState } from "react";
import {
  ArrowRightLeft,
  FileText,
} from "lucide-react";

interface Document {
  filename: string;
}

export default function ConverterPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selected, setSelected] = useState("");
  const [format, setFormat] = useState("docx");
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

  async function convertDocument() {
    if (!selected) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: selected,
            format,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download =
        selected.replace(".pdf", "") +
        "." +
        format;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Conversion failed.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

  {/* Hero Header */}

  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-700 dark:via-indigo-700 dark:to-cyan-600 p-10 shadow-2xl">

    <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

    <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>

    <div className="relative flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-extrabold text-white">

          📄 AI Document Converter

        </h1>

        <p className="mt-3 max-w-2xl text-lg text-blue-100">

          Convert your uploaded research papers into Word, PDF, Markdown,
          HTML, CSV, JSON and many other formats.

        </p>

      </div>

      <div className="hidden lg:flex">

        <div className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md p-6">

          <FileText className="h-16 w-16 text-white" />

        </div>

      </div>

    </div>

  </div>

  {documents.length === 0 ? (

    <div className="rounded-3xl border border-dashed border-border bg-card/80 p-12 text-center shadow-lg">

      <h2 className="text-2xl font-bold">

        No Research Papers Found

      </h2>

      <p className="mt-3 text-muted-foreground">

        Upload a PDF first before using the converter.

      </p>

    </div>

  ) : (

    <div className="rounded-3xl border border-border bg-card/90 backdrop-blur-xl shadow-xl p-8 space-y-8">
          {/* Select Research Paper */}

      <div>

        <label className="mb-3 block text-sm font-semibold text-muted-foreground uppercase tracking-wide">

          Select Research Paper

        </label>

        <select
          value={selected}
          disabled={loading}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background px-5 py-4 shadow-sm outline-none transition focus:border-primary"
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

      {/* Output Format */}

      <div>

        <label className="mb-3 block text-sm font-semibold text-muted-foreground uppercase tracking-wide">

          Convert To

        </label>

        <select
          value={format}
          disabled={loading}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full rounded-2xl border border-border bg-background px-5 py-4 shadow-sm outline-none transition focus:border-primary"
        >

          <option value="docx">Word (.docx)</option>

          <option value="pdf">PDF</option>

          <option value="txt">Text (.txt)</option>

          <option value="md">Markdown (.md)</option>

          <option value="html">HTML</option>

          <option value="csv">CSV</option>

          <option value="json">JSON</option>

        </select>

      </div>
            {/* Convert Button */}

      <div className="pt-2">

        <button
          onClick={convertDocument}
          disabled={loading}
          className="inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >

          <ArrowRightLeft className="h-5 w-5" />

          {loading
            ? "Converting..."
            : "Convert & Download"}

        </button>

      </div>

    </div>

  )}

</div>

  );
}