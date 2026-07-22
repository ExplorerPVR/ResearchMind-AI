"use client";

import {
  FileText,
  BookOpen,
  Database,
  HardDrive,
} from "lucide-react";

import { motion } from "framer-motion";

interface Props {
  papers: number;
  pages: number;
  chunks: number;
  storage: number;
}

export default function StatsCards({
  papers,
  pages,
  chunks,
  storage,
}: Props) {

  const cards = [
    {
      title: "Research Papers",
      value: papers,
      icon: FileText,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Pages",
      value: pages,
      icon: BookOpen,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "AI Chunks",
      value: chunks,
      icon: Database,
      color: "from-purple-500 to-violet-600",
    },
    {
      title: "Storage Used",
      value: `${storage} MB`,
      icon: HardDrive,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.15,
            }}
            whileHover={{
              y: -8,
            }}
            className="rounded-3xl border bg-card shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >

            <div
              className={`h-2 bg-gradient-to-r ${card.color}`}
            />

            <div className="p-7">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-muted-foreground text-sm">

                    {card.title}

                  </p>

                  <h2 className="text-4xl font-bold mt-3">

                    {card.value}

                  </h2>

                </div>

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-r ${card.color}`}
                >

                  <Icon size={30}/>

                </div>

              </div>

            </div>

          </motion.div>

        );

      })}

    </div>

  );

}