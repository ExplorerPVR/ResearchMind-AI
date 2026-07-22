"use client";

import { useEffect, useState } from "react";

interface Document {
  filename: string;
  pages: number;
  chunks: number;
}

interface CitationResponse {
  apa: string;
  ieee: string;
  mla: string;
  chicago: string;
  harvard: string;
  bibtex: string;
}

export default function CitationPage() {

  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState("");

  const [loading, setLoading] = useState(false);

  const [citation, setCitation] = useState<CitationResponse>({
    apa: "",
    ieee: "",
    mla: "",
    chicago: "",
    harvard: "",
    bibtex: "",
  });

  useEffect(() => {

    loadDocuments();

  }, []);

  async function loadDocuments() {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/documents"
      );

      const data = await response.json();

      setDocuments(data.documents || []);

    }

    catch (error) {

      console.error(error);

    }

  }

  async function generateCitation() {

    if (!selectedFile) {

      alert("Please select a research paper.");

      return;

    }

    setLoading(true);

    try {

      const response = await fetch(

        "http://127.0.0.1:8000/citation",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            filename: selectedFile,

          }),

        }

      );

      const data = await response.json();

      if (response.ok) {

        setCitation({

          apa: data.apa || "",

          ieee: data.ieee || "",

          mla: data.mla || "",

          chicago: data.chicago || "",

          harvard: data.harvard || "",

          bibtex: data.bibtex || "",

        });

      }

      else {

        alert(data.detail || "Failed to generate citation.");

      }

    }

    catch (error) {

      console.error(error);

      alert("Backend connection failed.");

    }

    setLoading(false);

  }

  function copy(text: string) {

    navigator.clipboard.writeText(text);

    alert("Citation Copied!");

  }

  const citationFormats = [

    { title: "APA", value: citation.apa },

    { title: "IEEE", value: citation.ieee },

    { title: "MLA", value: citation.mla },

    { title: "Chicago", value: citation.chicago },

    { title: "Harvard", value: citation.harvard },

    { title: "BibTeX", value: citation.bibtex },

  ];

  return (

  <div className="max-w-6xl mx-auto space-y-8">

    {/* Hero Header */}

    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-700 dark:via-indigo-700 dark:to-cyan-600 p-10 shadow-2xl mb-8">

      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>

      <div className="relative flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-white">

            📚 Citation Generator

          </h1>

          <p className="mt-3 text-lg text-blue-100 max-w-2xl">

            Instantly generate professional citations in APA, IEEE, MLA,
            Chicago, Harvard and BibTeX formats.

          </p>

        </div>

        <div className="hidden lg:flex">

          <div className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md p-6">

            <span className="text-6xl">

              📚

            </span>

          </div>

        </div>

      </div>

    </div>

    {documents.length === 0 ? (

      <div className="rounded-2xl border bg-card p-12 shadow text-center">

        <h2 className="text-xl font-semibold mb-3">

          No Research Papers Found

        </h2>

        <p className="text-muted-foreground">

          Upload a PDF first to generate citations.

        </p>

      </div>

    ) : (

      <div className="rounded-2xl border bg-card shadow p-8 space-y-8">

        {/* Paper Selection */}

        <div>

          <label className="block text-sm font-semibold mb-3">

            Select Research Paper

          </label>

          <select

            value={selectedFile}

            disabled={loading}

            onChange={(e)=>setSelectedFile(e.target.value)}

            className="rounded-3xl border border-border bg-card/90 backdrop-blur-xl shadow-xl p-8"
          >

            <option value="">

              Choose Research Paper

            </option>

            {documents.map((doc)=>(

              <option

                key={doc.filename}

                value={doc.filename}

              >

                {doc.filename} ({doc.pages} Pages)

              </option>

            ))}

          </select>

        </div>

        {/* Generate Button */}

        <div>

          <button

            onClick={generateCitation}

            disabled={loading}

            className="rounded-3xl border border-border bg-card/90 backdrop-blur-xl shadow-xl p-6"

          >

            {loading

              ? "Generating..."

              : "Generate Citation"}

          </button>

        </div>

      </div>

    )}

    {(

      citation.apa ||

      citation.ieee ||

      citation.mla ||

      citation.chicago ||

      citation.harvard ||

      citation.bibtex

    ) && (

      <div className="space-y-6">

        {citationFormats.map((item)=>(

          <div

            key={item.title}

            className="rounded-2xl border bg-card shadow"

          >

            <div className="

              flex

              items-center

              justify-between

              border-b

              px-6

              py-4

            ">

              <h2 className="text-xl font-bold">

                {item.title}

              </h2>

              <button

                onClick={()=>copy(item.value)}

                className="rounded-xl bg-primary px-5 py-2.5 text-primary-foreground shadow transition hover:opacity-90"

              >

                Copy

              </button>

            </div>

            <div className="p-6">

              <pre className="

                whitespace-pre-wrap

                break-words

                text-muted-foreground

                leading-7

                font-sans

              ">

                {item.value || "Not Available"}

              </pre>

            </div>

          </div>

        ))}

      </div>

          )}
    </div>
  );
}