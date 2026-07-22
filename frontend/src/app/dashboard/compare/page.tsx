"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import { jsPDF } from "jspdf";

import {
  Document as WordDocument,
  Packer,
  Paragraph,
  HeadingLevel,
} from "docx";

import { saveAs } from "file-saver";

interface ResearchDocument {
  filename: string;
  pages: number;
  chunks: number;
}

export default function ComparePage() {

  const [documents, setDocuments] = useState<ResearchDocument[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [comparison, setComparison] = useState("");
  const [loading, setLoading] = useState(false);

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

  function toggleSelection(filename: string) {

    if (selected.includes(filename)) {

      setSelected(
        selected.filter((item) => item !== filename)
      );

    }

    else {

      setSelected([
        ...selected,
        filename,
      ]);

    }

  }

  async function compare() {

    if (selected.length < 2) {

      alert("Please select at least two research papers.");

      return;

    }

    setLoading(true);

    setComparison("");

    try {

      const response = await fetch(

        "http://127.0.0.1:8000/compare",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            filenames: selected,

          }),

        }

      );

      const data = await response.json();

      if (response.ok) {

        setComparison(data.comparison);

      }

      else {

        setComparison(

          data.detail ||

          "Comparison failed."

        );

      }

    }

    catch (error) {

      console.error(error);

      setComparison(

        "Could not connect to backend."

      );

    }

    setLoading(false);

  }
    // ----------------------------------------------------
  // Download TXT
  // ----------------------------------------------------

  function downloadTXT() {

    const blob = new Blob(

      [comparison],

      {

        type: "text/plain;charset=utf-8",

      }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "ResearchMind_Comparison_Report.txt";

    a.click();

    URL.revokeObjectURL(url);

  }

  // ----------------------------------------------------
  // Download Markdown
  // ----------------------------------------------------

  function downloadMarkdown() {

    const blob = new Blob(

      [comparison],

      {

        type: "text/markdown;charset=utf-8",

      }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "ResearchMind_Comparison_Report.md";

    a.click();

    URL.revokeObjectURL(url);

  }

  // ----------------------------------------------------
  // Download PDF
  // ----------------------------------------------------

  function downloadPDF() {

    const pdf = new jsPDF({

      orientation: "portrait",

      unit: "mm",

      format: "a4",

    });

    pdf.setFont("helvetica", "bold");

    pdf.setFontSize(22);

    pdf.text("ResearchMind AI", 15, 18);

    pdf.setFont("helvetica", "normal");

    pdf.setFontSize(15);

    pdf.text(

      "Research Paper Comparison Report",

      15,

      30

    );

    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(

      comparison,

      180

    );

    let y = 42;

    lines.forEach((line: string) => {

      if (y > 280) {

        pdf.addPage();

        y = 20;

      }

      pdf.text(line, 15, y);

      y += 6;

    });

    pdf.save(

      "ResearchMind_Comparison_Report.pdf"

    );

  }

  // ----------------------------------------------------
  // Download Word
  // ----------------------------------------------------

  async function downloadWord() {

    const paragraphs = comparison

      .split("\n")

      .filter(

        (line) => line.trim() !== ""

      )

      .map(

        (line) =>

          new Paragraph({

            text: line,

            spacing: {

              after: 180,

            },

          })

      );

    const doc = new WordDocument({

      sections: [

        {

          children: [

            new Paragraph({

              heading: HeadingLevel.TITLE,

              text: "ResearchMind AI",

            }),

            new Paragraph({

              heading: HeadingLevel.HEADING_1,

              text:

                "Research Paper Comparison Report",

            }),

            ...paragraphs,

          ],

        },

      ],

    });

    const blob = await Packer.toBlob(doc);

    saveAs(

      blob,

      "ResearchMind_Comparison_Report.docx"

    );

  }
    return (

    <div className="mx-auto max-w-7xl space-y-8">

      {/* Hero Header */}

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-700 dark:via-indigo-700 dark:to-cyan-600 p-10 shadow-2xl mb-8">

        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>

        <div className="relative flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-extrabold text-white">

              📊 Compare Research Papers

            </h1>

            <p className="mt-3 text-lg text-blue-100 max-w-2xl">

              Compare multiple research papers side-by-side and generate an AI-powered comparison report.

            </p>

          </div>

          <div className="hidden lg:flex">

            <div className="rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md p-6">

              <span className="text-6xl">📊</span>

            </div>

          </div>

        </div>

      </div>

      {/* ---------------- Paper Selection ---------------- */}

      <div className="rounded-3xl border bg-card p-8 shadow-sm">

        <div className="mb-6">

          <h2 className="text-2xl font-semibold">

            Select Research Papers

          </h2>

          <p className="mt-2 text-muted-foreground">

            Choose at least two papers for comparison.

          </p>

        </div>

        {documents.length === 0 ? (

          <div className="rounded-2xl border border-dashed p-12 text-center">

            <p className="text-lg font-medium">

              No research papers found.

            </p>

            <p className="mt-2 text-muted-foreground">

              Upload PDFs first from the Upload page.

            </p>

          </div>

        ) : (

          <>

            <div className="space-y-4">

              {documents.map((doc) => (

                <label

                  key={doc.filename}

                  className={`

                    flex

                    cursor-pointer

                    items-center

                    gap-5

                    rounded-2xl

                    border

                    p-5

                    transition

                    hover:border-primary

                    hover:bg-muted/50

                    ${selected.includes(doc.filename)

                      ? "border-primary bg-primary/10"

                      : "bg-card"}

                  `}

                >

                  <input

                    type="checkbox"

                    checked={selected.includes(doc.filename)}

                    disabled={loading}

                    onChange={() =>

                      toggleSelection(doc.filename)

                    }

                    className="h-5 w-5"

                  />

                  <div className="flex-1">

                    <h3 className="font-semibold">

                      {doc.filename}

                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">

                      {doc.pages} Pages • {doc.chunks} Chunks

                    </p>

                  </div>

                </label>

              ))}

            </div>

            <button

              onClick={compare}

              disabled={loading}

              className="mt-8 rounded-xl bg-primary px-8 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"

            >

              {loading

                ? "Comparing Research Papers..."

                : "Compare Papers"}

            </button>

          </>

        )}

      </div>
            {/* ---------------- Comparison Result ---------------- */}

      {comparison && (

        <div className="rounded-3xl border bg-card p-8 shadow-sm">

          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-3xl font-bold">

                🤖 AI Comparison Report

              </h2>

              <p className="mt-2 text-muted-foreground">

                Generated by ResearchMind AI

              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <button

                onClick={downloadPDF}

                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"

              >

                <Download className="h-4 w-4" />

                PDF

              </button>

              <button

                onClick={downloadWord}

                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"

              >

                <Download className="h-4 w-4" />

                Word

              </button>

              <button

                onClick={downloadMarkdown}

                className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"

              >

                <Download className="h-4 w-4" />

                Markdown

              </button>

              <button

                onClick={downloadTXT}

                className="flex items-center gap-2 rounded-xl bg-gray-700 px-5 py-3 text-white transition hover:bg-gray-800"

              >

                <Download className="h-4 w-4" />

                TXT

              </button>

            </div>

          </div>

          <div

            className="rounded-3xl border border-border bg-card/90 backdrop-blur-xl p-8 shadow-xl whitespace-pre-wrap leading-8"

          >

            {comparison}

          </div>

        </div>

      )}
      
    </div>

  );

}