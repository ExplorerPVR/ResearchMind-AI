"use client";

export default function TypingAnimation() {

  return (

    <div className="flex gap-2 items-center rounded-2xl border bg-card p-5 w-fit shadow">

      <div className="w-3 h-3 rounded-full bg-primary animate-bounce"/>

      <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"/>

      <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"/>

    </div>

  );

}