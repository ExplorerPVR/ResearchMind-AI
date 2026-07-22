"use client";

export default function LibraryFilters() {

  return (

    <div className="flex gap-4 flex-wrap">

      <select className="rounded-xl border p-3 bg-card">

        <option>Newest</option>

        <option>Oldest</option>

        <option>Name A-Z</option>

        <option>Name Z-A</option>

      </select>

      <button className="rounded-xl border px-5 py-3 bg-card hover:bg-muted">

        All Papers

      </button>

    </div>

  );

}