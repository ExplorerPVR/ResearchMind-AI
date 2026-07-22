"use client";

import { Search, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {

    const { theme, setTheme } = useTheme();

    return (

        <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b">

            <div className="h-20 px-8 flex items-center justify-between">

                {/* Left */}

                <div>

                    <h1 className="text-2xl font-bold">

                        🧠 ResearchMind AI

                    </h1>

                </div>

                {/* Center */}

                <div className="hidden lg:flex w-[420px]">

                    <div className="relative w-full">

                        <Search
                            className="absolute left-4 top-3.5 text-muted-foreground"
                            size={18}
                        />

                        <input
                            placeholder="Search papers..."
                            className="w-full rounded-full border bg-card pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
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

                        {theme === "dark"
                            ? <Sun size={18}/>
                            : <Moon size={18}/>}

                    </button>

                    <button className="rounded-full border p-3 hover:bg-muted">

                        <Bell size={18}/>

                    </button>

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">

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