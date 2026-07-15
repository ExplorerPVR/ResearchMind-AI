import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ChatPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold">
        💬 AI Chat
      </h1>

      <p className="mt-3 text-gray-600">
        Chat with your research documents.
      </p>

    </DashboardLayout>
  );
}