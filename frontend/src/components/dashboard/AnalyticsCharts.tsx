"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const uploadData = [
  { month: "Jan", papers: 2 },
  { month: "Feb", papers: 5 },
  { month: "Mar", papers: 8 },
  { month: "Apr", papers: 10 },
  { month: "May", papers: 13 },
  { month: "Jun", papers: 18 },
];

const pieData = [
  { name: "Research Papers", value: 55 },
  { name: "Books", value: 20 },
  { name: "Articles", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

export default function AnalyticsCharts() {

  return (

    <section className="grid lg:grid-cols-2 gap-8">

      <div className="rounded-3xl border bg-card shadow-lg p-6">

        <h2 className="text-xl font-bold mb-5">
          📈 Upload Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={uploadData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Line
              type="monotone"
              dataKey="papers"
              stroke="#6366f1"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="rounded-3xl border bg-card shadow-lg p-6">

        <h2 className="text-xl font-bold mb-5">
          📊 Document Types
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >

              {pieData.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip/>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </section>

  );

}