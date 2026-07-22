"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsPage() {

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (

    <div className="max-w-5xl mx-auto space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          ⚙️ Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your application preferences.
        </p>

      </div>

      <div className="rounded-2xl border bg-card p-8 shadow">

        <h2 className="text-xl font-semibold mb-6">
          Appearance
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <button
            onClick={() => setTheme("light")}
            className={`rounded-xl border p-6 transition ${
              theme === "light"
                ? "border-primary bg-primary/10"
                : "hover:border-primary"
            }`}
          >

            <Sun className="w-8 h-8 mx-auto mb-3" />

            <p className="font-medium">
              Light
            </p>

          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`rounded-xl border p-6 transition ${
              theme === "dark"
                ? "border-primary bg-primary/10"
                : "hover:border-primary"
            }`}
          >

            <Moon className="w-8 h-8 mx-auto mb-3" />

            <p className="font-medium">
              Dark
            </p>

          </button>

          <button
            onClick={() => setTheme("system")}
            className={`rounded-xl border p-6 transition ${
              theme === "system"
                ? "border-primary bg-primary/10"
                : "hover:border-primary"
            }`}
          >

            <Monitor className="w-8 h-8 mx-auto mb-3" />

            <p className="font-medium">
              System
            </p>

          </button>

        </div>

      </div>

    </div>

  );

}