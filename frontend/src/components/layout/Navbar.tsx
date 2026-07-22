"use client";

import { useEffect, useState } from "react";
import { Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {

    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (

        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">

            <div className="flex h-20 items-center justify-between px-8">

                {/* Left */}

                <div>

                    <h1 className="text-2xl font-bold">

                        🧠 ResearchMind AI

                    </h1>

                </div>

                {/* Center */}

                <div className="hidden w-[420px] lg:flex">

                    <div className="relative w-full">

                        <Search
                            className="absolute left-4 top-3.5 text-muted-foreground"
                            size={18}
                        />

                        <input
                            placeholder="Search papers..."
                            className="w-full rounded-full border bg-card py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-5">

                    <button
                        onClick={() =>
                            setTheme(
                                theme === "dark"
                                    ? "light"
                                    : "dark"
                            )
                        }
                        className="rounded-full border p-3 hover:bg-muted"
                    >

                        {!mounted ? (

                            <Moon size={18} />

                        ) : theme === "dark" ? (

                            <Sun size={18} />

                        ) : (

                            <Moon size={18} />

                        )}

                    </button>

                    <button className="rounded-full border p-3 hover:bg-muted">

                        <Bell size={18} />

                    </button>

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">

                            P

                        </div>

                        <div className="hidden md:block">

                            <p className="font-semibold">

                                Prince

                            </p>

                            <p className="text-xs text-muted-foreground">

                                Researcher

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}