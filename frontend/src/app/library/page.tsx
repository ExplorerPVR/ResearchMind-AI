import DashboardLayout from "@/components/layout/DashboardLayout";

export default function LibraryPage() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">
        📚 Library
      </h1>

      <p className="mt-3 text-gray-600">
        View all uploaded research papers.
      </p>
    </DashboardLayout>
  );
}