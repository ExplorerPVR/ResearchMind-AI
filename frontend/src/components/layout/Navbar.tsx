export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b px-8 flex items-center justify-between">

      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-64"
        />

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          P
        </div>

      </div>

    </header>
  );
}