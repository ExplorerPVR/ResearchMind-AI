import DashboardStats from "./DashboardStats";
import RecentDocuments from "./RecentDocuments";
import QuickActions from "./QuickActions";

export default function DashboardHome() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Welcome to ResearchMind AI 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Your Agentic AI Research Assistant
        </p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <RecentDocuments />
        </div>

        <QuickActions />

      </div>

    </div>
  );
}