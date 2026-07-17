"use client";

import { useState } from "react";

export default function ChatWindow() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function askQuestion() {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: "demo-session",
          question: userQuestion,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to connect to backend.",
          sources: [],
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="border rounded-lg h-[500px] overflow-y-auto p-4 bg-white shadow">

        {messages.map((msg, index) => (
          <div key={index} className="mb-6">

            <div className="font-semibold">
              {msg.role === "user" ? "You" : "ResearchMind AI"}
            </div>

            <div className="mt-1 whitespace-pre-wrap">
              {msg.text}
            </div>

            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-3">

                <div className="font-semibold text-blue-700">
                  Sources
                </div>

                <ul className="list-disc ml-6 mt-1">

                  {msg.sources.map((source: string, i: number) => (
                    <li key={i}>
                      {source}
                    </li>
                  ))}

                </ul>

              </div>
            )}

          </div>
        ))}

      </div>

      <div className="flex gap-3 mt-4">

        <input
          className="flex-1 border rounded-lg p-3"
          placeholder="Ask a research question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>

      </div>

    </div>
  );
}