import DashboardLayout from "@/components/layout/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold">
        ⚙️ Settings
      </h1>

      <p className="mt-3 text-gray-600">
        Manage your account and preferences.
      </p>

    </DashboardLayout>
  );
}