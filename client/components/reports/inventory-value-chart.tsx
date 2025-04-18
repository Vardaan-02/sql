"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    value: 112000,
  },
  {
    name: "Feb",
    value: 115000,
  },
  {
    name: "Mar",
    value: 118000,
  },
  {
    name: "Apr",
    value: 120000,
  },
  {
    name: "May",
    value: 118000,
  },
  {
    name: "Jun",
    value: 122000,
  },
  {
    name: "Jul",
    value: 125000,
  },
  {
    name: "Aug",
    value: 123000,
  },
  {
    name: "Sep",
    value: 122000,
  },
  {
    name: "Oct",
    value: 124500,
  },
]

export function InventoryValueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
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
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Inventory Value"]} />
        <Area type="monotone" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
