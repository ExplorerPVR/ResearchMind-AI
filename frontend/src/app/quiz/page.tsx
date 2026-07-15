import DashboardLayout from "@/components/layout/DashboardLayout";

export default function QuizPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold">
        🎓 Quiz Generator
      </h1>

      <p className="mt-3 text-gray-600">
        Generate quizzes from research papers.
      </p>

    </DashboardLayout>
  );
}