"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  Upload,
  MessageSquare,
  FileText,
  Scale,
  Quote,
  Settings,
  ArrowLeftRight,
  BrainCircuit,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upload",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    title: "Library",
    href: "/dashboard/library",
    icon: Library,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    title: "Summary",
    href: "/dashboard/summary",
    icon: FileText,
  },
  {
    title: "Compare",
    href: "/dashboard/compare",
    icon: Scale,
  },
  {
    title: "Converter",
    href: "/dashboard/converter",
    icon: ArrowLeftRight,
  },
  {
    title: "Citation",
    href: "/dashboard/citation",
    icon: Quote,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (

    <aside className="flex h-screen w-72 flex-col border-r bg-background">

      {/* Logo */}

      <div className="border-b p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">

            <BrainCircuit className="h-7 w-7"/>

          </div>

          <div>

            <h1 className="text-xl font-bold">
              ResearchMind AI
            </h1>

            <p className="text-sm text-muted-foreground">
              AI Research Assistant
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">

        {items.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center gap-4 rounded-xl px-4 py-3
                transition-all duration-200

                ${
                  active
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              `}
            >

              <Icon
                className={`
                  h-5 w-5 transition-transform duration-200
                  ${!active && "group-hover:scale-110"}
                `}
              />

              <span className="font-medium">
                {item.title}
              </span>

            </Link>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t p-5">

        <div className="rounded-xl bg-muted p-4">

          <p className="text-sm font-semibold">
            ResearchMind AI
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Version 1.0.0
          </p>

        </div>

      </div>

    </aside>

  );

}