"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "0-15 days",
    count: 12,
    value: 15000,
  },
  {
    name: "16-30 days",
    count: 16,
    value: 18000,
  },
  {
    name: "31-45 days",
    count: 8,
    value: 10000,
  },
  {
    name: "46-60 days",
    count: 14,
    value: 16000,
  },
  {
    name: "61-75 days",
    count: 6,
    value: 8000,
  },
  {
    name: "76-90 days",
    count: 10,
    value: 12000,
  },
]

export function ExpiryForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#f97316" />
        <YAxis yAxisId="right" orientation="right" stroke="#6366f1" />
        <Tooltip />
        <Bar yAxisId="left" dataKey="count" fill="#f97316" name="Items" radius={[4, 4, 0, 0]} />
        <Bar yAxisId="right" dataKey="value" fill="#6366f1" name="Value ($)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
