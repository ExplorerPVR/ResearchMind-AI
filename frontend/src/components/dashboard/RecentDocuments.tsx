const papers = [
  "Transformer Architecture",
  "GPT-4 Technical Report",
  "RAG Survey Paper",
];

export default function RecentDocuments() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Research Papers
      </h2>

      <div className="space-y-3">
        {papers.map((paper) => (
          <div
            key={paper}
            className="border rounded-lg p-4 hover:bg-gray-100 transition"
          >
            {paper}
          </div>
        ))}
      </div>
    </div>
  );
}