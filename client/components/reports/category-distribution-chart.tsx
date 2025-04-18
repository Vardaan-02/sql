"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

const data = [
  { name: "Medications", value: 45, color: "#0ea5e9" },
  { name: "Equipment", value: 30, color: "#10b981" },
  { name: "Supplies", value: 20, color: "#6366f1" },
  { name: "Laboratory", value: 5, color: "#f97316" },
]

export function CategoryDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
      </PieChart>
    </ResponsiveContainer>
  )
}
