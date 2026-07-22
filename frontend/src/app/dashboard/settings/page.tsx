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
    <div className="space-y-8">

      {/* Hero Header */}

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-700 dark:via-indigo-700 dark:to-cyan-600 p-10 shadow-2xl">

        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl"></div>

        <div className="relative flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-extrabold text-white">

              ⚙️ Settings

            </h1>

            <p className="mt-3 max-w-2xl text-lg text-blue-100">

              Personalize your ResearchMind AI experience by choosing your
              preferred appearance.

            </p>

          </div>

          <div className="hidden lg:flex">

            <div className="rounded-2xl border border-white/20 bg-white/15 p-6 backdrop-blur-md">

              <span className="text-6xl">

                ⚙️

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Settings Card */}

      <div className="rounded-3xl border border-border bg-card/90 backdrop-blur-xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold tracking-tight">

          Appearance

        </h2>

        <p className="mt-2 text-muted-foreground">

          Choose how ResearchMind AI looks on your device.

        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Light */}

          <button
            onClick={() => setTheme("light")}
            className={`rounded-2xl border p-8 shadow-sm transition-all hover:scale-[1.02] ${
              theme === "light"
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-border hover:border-primary"
            }`}
          >

            <Sun className="mx-auto mb-4 h-10 w-10 text-yellow-500" />

            <h3 className="text-lg font-semibold">

              Light Mode

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              Bright interface for daytime use.

            </p>

          </button>

          {/* Dark */}

          <button
            onClick={() => setTheme("dark")}
            className={`rounded-2xl border p-8 shadow-sm transition-all hover:scale-[1.02] ${
              theme === "dark"
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-border hover:border-primary"
            }`}
          >

            <Moon className="mx-auto mb-4 h-10 w-10 text-blue-500" />

            <h3 className="text-lg font-semibold">

              Dark Mode

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              Comfortable viewing in low light.

            </p>

          </button>

          {/* System */}

          <button
            onClick={() => setTheme("system")}
            className={`rounded-2xl border p-8 shadow-sm transition-all hover:scale-[1.02] ${
              theme === "system"
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-border hover:border-primary"
            }`}
          >

            <Monitor className="mx-auto mb-4 h-10 w-10 text-indigo-500" />

            <h3 className="text-lg font-semibold">

              System

            </h3>

            <p className="mt-2 text-sm text-muted-foreground">

              Match your operating system preference.

            </p>

          </button>

        </div>

      </div>

    </div>
  );
}