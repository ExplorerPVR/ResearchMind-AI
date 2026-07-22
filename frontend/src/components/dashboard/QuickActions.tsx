"use client";

import Link from "next/link";

import {
  Upload,
  MessageSquare,
 Library,
 FileText,
 Scale,
 ArrowLeftRight,
 Quote,
} from "lucide-react";

import { motion } from "framer-motion";

const actions = [
  {
    title: "Upload Paper",
    description: "Upload PDFs into your AI knowledge base",
    href: "/upload",
    icon: Upload,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI Chat",
    description: "Ask questions using RAG",
    href: "/chat",
    icon: MessageSquare,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Research Library",
    description: "Browse uploaded papers",
    href: "/library",
    icon: Library,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "AI Summary",
    description: "Generate research summaries",
    href: "/summary",
    icon: FileText,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Compare Papers",
    description: "Compare multiple papers",
    href: "/compare",
    icon: Scale,
    color: "from-cyan-500 to-sky-600",
  },
  {
    title: "Converter",
    description: "Convert into multiple formats",
    href: "/converter",
    icon: ArrowLeftRight,
    color: "from-violet-500 to-indigo-700",
  },
  {
    title: "Citation",
    description: "Generate APA • MLA • IEEE",
    href: "/citation",
    icon: Quote,
    color: "from-pink-500 to-rose-600",
  },
];

export default function QuickActions() {
  return (
    <section>

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action, index) => {

          const Icon = action.icon;

          return (

            <motion.div
              key={action.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
            >

              <Link
                href={action.href}
                className="block rounded-3xl border bg-card p-6 shadow-lg hover:shadow-2xl transition"
              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${action.color} text-white mb-5`}
                >

                  <Icon size={30}/>

                </div>

                <h3 className="text-xl font-bold">

                  {action.title}

                </h3>

                <p className="mt-2 text-muted-foreground">

                  {action.description}

                </p>

              </Link>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}