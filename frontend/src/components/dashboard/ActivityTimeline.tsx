"use client";

import {
    Upload,
    MessageSquare,
    FileText,
    Scale,
} from "lucide-react";

const activities = [
    {
        icon: Upload,
        title: "Uploaded Research Paper",
        time: "2 min ago",
        color: "bg-blue-500",
    },
    {
        icon: MessageSquare,
        title: "Asked AI Question",
        time: "10 min ago",
        color: "bg-green-500",
    },
    {
        icon: FileText,
        title: "Generated Summary",
        time: "25 min ago",
        color: "bg-purple-500",
    },
    {
        icon: Scale,
        title: "Compared Two Papers",
        time: "1 hour ago",
        color: "bg-orange-500",
    },
];

export default function ActivityTimeline() {

    return (

        <div className="rounded-3xl border bg-card shadow-lg p-6">

            <h2 className="text-xl font-bold mb-6">

                🕒 Recent Activity

            </h2>

            <div className="space-y-5">

                {activities.map((activity, index) => {

                    const Icon = activity.icon;

                    return (

                        <div
                            key={index}
                            className="flex gap-4 items-center"
                        >

                            <div
                                className={`w-12 h-12 rounded-full ${activity.color} text-white flex items-center justify-center`}
                            >

                                <Icon size={20} />

                            </div>

                            <div>

                                <p className="font-medium">

                                    {activity.title}

                                </p>

                                <p className="text-sm text-muted-foreground">

                                    {activity.time}

                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}