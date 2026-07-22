"use client";

const suggestions = [

  "Summarize this research paper",

  "What is the main contribution?",

  "Explain methodology",

  "Compare with previous work",

  "List limitations",

  "Generate future research ideas",

];

export default function SuggestedQuestions() {

  return (

    <section>

      <h3 className="text-xl font-semibold mb-5">

        Suggested Questions

      </h3>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

        {suggestions.map((question)=>(

          <button

            key={question}

            className="rounded-2xl border bg-card p-5 text-left hover:border-primary hover:shadow-lg transition"

          >

            {question}

          </button>

        ))}

      </div>

    </section>

  );

}