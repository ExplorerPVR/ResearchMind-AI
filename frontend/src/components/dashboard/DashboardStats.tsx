import { FileText, MessageSquare, Brain, BookOpen } from "lucide-react";

const stats = [
  {
    title: "Research Papers",
    value: "0",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    title: "AI Chats",
    value: "0",
    icon: MessageSquare,
    color: "bg-green-500",
  },
  {
    title: "Summaries",
    value: "0",
    icon: BookOpen,
    color: "bg-orange-500",
  },
  {
    title: "AI Agents",
    value: "4",
    icon: Brain,
    color: "bg-purple-500",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            <div className={`${item.color} p-4 rounded-xl text-white`}>
              <Icon size={28} />
            </div>
          </div>
        );
      })}
    </div>
  );
}