"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    orders: 32,
    amount: 42000,
  },
  {
    name: "Feb",
    orders: 28,
    amount: 38000,
  },
  {
    name: "Mar",
    orders: 35,
    amount: 45000,
  },
  {
    name: "Apr",
    orders: 30,
    amount: 40000,
  },
  {
    name: "May",
    orders: 38,
    amount: 48000,
  },
  {
    name: "Jun",
    orders: 42,
    amount: 52000,
  },
  {
    name: "Jul",
    orders: 45,
    amount: 55000,
  },
  {
    name: "Aug",
    orders: 40,
    amount: 50000,
  },
  {
    name: "Sep",
    orders: 38,
    amount: 48000,
  },
  {
    name: "Oct",
    orders: 42,
    amount: 52000,
  },
]

export function OrdersTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
        <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
        <Tooltip />
        <Bar yAxisId="left" dataKey="orders" fill="#0ea5e9" name="Orders" />
        <Bar yAxisId="right" dataKey="amount" fill="#10b981" name="Amount ($)" />
      </BarChart>
    </ResponsiveContainer>
  )
}
