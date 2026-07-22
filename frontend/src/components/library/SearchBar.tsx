"use client";

import { Search } from "lucide-react";

interface Props {

  value: string;

  onChange: (value: string) => void;

}

export default function SearchBar({

  value,

  onChange,

}: Props) {

  return (

    <div className="relative">

      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>

      <input

        value={value}

        onChange={(e)=>onChange(e.target.value)}

        placeholder="Search research papers..."

        className="w-full rounded-2xl border bg-card py-4 pl-12 pr-5 shadow"

      />

    </div>

  );

}