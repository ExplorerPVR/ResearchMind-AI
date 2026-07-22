"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { Bot, User } from "lucide-react";

import MessageActions from "./MessageActions";

interface Props {
  role: "user" | "assistant";
  message: string;
  timestamp?: string;
  onRegenerate?: () => void;
}

export default function ChatBubble({
  role,
  message,
  timestamp,
  onRegenerate,
}: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {!isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
          <Bot className="h-5 w-5" />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`max-w-4xl rounded-3xl px-6 py-5 shadow-lg transition-all duration-300 hover:shadow-xl

        ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "border bg-card"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-7">
            {message}
          </p>
        ) : (
          <>
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {message}
              </ReactMarkdown>
            </article>

            <MessageActions
              message={message}
              onRegenerate={onRegenerate}
            />
          </>
        )}

        {timestamp && (
          <p className="mt-3 text-xs opacity-70">
            {timestamp}
          </p>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-700 text-white shadow">
          <User className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}