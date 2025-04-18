"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "0-15 days",
    count: 12,
  },
  {
    name: "16-30 days",
    count: 16,
  },
  {
    name: "31-45 days",
    count: 8,
  },
  {
    name: "46-60 days",
    count: 14,
  },
  {
    name: "61-75 days",
    count: 6,
  },
  {
    name: "76-90 days",
    count: 10,
  },
]

export function ExpiryChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
