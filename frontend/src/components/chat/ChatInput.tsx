"use client";

import { SendHorizontal, Paperclip } from "lucide-react";

interface Props {

  value: string;

  onChange: (text: string) => void;

  onSend: () => void;

}

export default function ChatInput({

  value,

  onChange,

  onSend,

}: Props) {

  return (

    <div className="rounded-3xl border bg-card shadow-lg p-4">

      <div className="flex items-end gap-4">

        <button className="p-3 rounded-xl hover:bg-muted">

          <Paperclip className="w-5 h-5"/>

        </button>

        <textarea

          rows={2}

          value={value}

          onChange={(e)=>onChange(e.target.value)}

          placeholder="Ask anything about your research papers..."

          className="flex-1 resize-none bg-transparent outline-none"

        />

        <button

          onClick={onSend}

          className="rounded-2xl bg-primary text-primary-foreground p-4 hover:scale-105 transition"

        >

          <SendHorizontal className="w-5 h-5"/>

        </button>

      </div>

    </div>

  );

}