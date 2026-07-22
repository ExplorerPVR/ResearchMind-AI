"use client";

import {
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

import { toast } from "sonner";

interface Props {
  message: string;
  onRegenerate?: () => void;
}

export default function MessageActions({
  message,
  onRegenerate,
}: Props) {

  async function copyMessage() {

    try {

      await navigator.clipboard.writeText(message);

      toast.success("Copied to clipboard");

    } catch {

      toast.error("Failed to copy");

    }

  }

  function likeMessage() {

    toast.success("Thanks for your feedback!");

  }

  function dislikeMessage() {

    toast.info("We'll improve future responses.");

  }

  return (

    <div className="mt-5 flex items-center gap-2 border-t pt-4">

      <button
        onClick={copyMessage}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-primary"
      >
        <Copy size={16} />
        Copy
      </button>

      <button
        onClick={onRegenerate}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-primary"
      >
        <RotateCcw size={16} />
        Retry
      </button>

      <div className="ml-auto flex gap-2">

        <button
          onClick={likeMessage}
          className="rounded-xl p-2 text-muted-foreground transition hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/30"
        >
          <ThumbsUp size={16} />
        </button>

        <button
          onClick={dislikeMessage}
          className="rounded-xl p-2 text-muted-foreground transition hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
        >
          <ThumbsDown size={16} />
        </button>

      </div>

    </div>

  );

}