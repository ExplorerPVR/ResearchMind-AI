"use client";

import { FileText, Database, HardDrive } from "lucide-react";

export default function UploadStats() {

  const stats = [
    {
      title: "Today's Uploads",
      value: "5",
      icon: FileText,
    },
    {
      title: "Pages Processed",
      value: "184",
      icon: Database,
    },
    {
      title: "Storage Used",
      value: "32 MB",
      icon: HardDrive,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-3">

      {stats.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="rounded-3xl border bg-card shadow-lg p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>

              </div>

              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="text-primary h-7 w-7" />
              </div>

            </div>

          </div>

        );

      })}

    </section>
  );
}