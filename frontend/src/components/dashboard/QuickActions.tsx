import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="space-y-4">

        <Link
          href="/upload"
          className="block bg-blue-600 text-white rounded-lg p-4 text-center hover:bg-blue-700"
        >
          Upload Research Paper
        </Link>

        <Link
          href="/chat"
          className="block bg-green-600 text-white rounded-lg p-4 text-center hover:bg-green-700"
        >
          Start AI Chat
        </Link>

        <Link
          href="/compare"
          className="block bg-purple-600 text-white rounded-lg p-4 text-center hover:bg-purple-700"
        >
          Compare Papers
        </Link>

      </div>
    </div>
  );
}