"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    Medications: 4000,
    Equipment: 2400,
    Supplies: 2400,
  },
  {
    name: "Feb",
    Medications: 3000,
    Equipment: 1398,
    Supplies: 2210,
  },
  {
    name: "Mar",
    Medications: 2000,
    Equipment: 9800,
    Supplies: 2290,
  },
  {
    name: "Apr",
    Medications: 2780,
    Equipment: 3908,
    Supplies: 2000,
  },
  {
    name: "May",
    Medications: 1890,
    Equipment: 4800,
    Supplies: 2181,
  },
  {
    name: "Jun",
    Medications: 2390,
    Equipment: 3800,
    Supplies: 2500,
  },
  {
    name: "Jul",
    Medications: 3490,
    Equipment: 4300,
    Supplies: 2100,
  },
]

export function InventoryOverviewChart() {
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
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Medications" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
        <Area type="monotone" dataKey="Equipment" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
        <Area type="monotone" dataKey="Supplies" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
