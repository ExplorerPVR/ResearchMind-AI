import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SummaryPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold">
        📝 Summaries
      </h1>

      <p className="mt-3 text-gray-600">
        Generate AI-powered summaries.
      </p>

    </DashboardLayout>
  );
}