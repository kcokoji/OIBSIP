"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DataPoint {
  name: string;
  total: number;
}

interface OverviewProps {
  data: DataPoint[];
}

export const Overview = ({ data }: OverviewProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} barSize={80}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₦ ${value}`}
        />
        <CartesianGrid strokeDasharray="3 6 " vertical={false} />
        <Tooltip formatter={(value) => `₦ ${value}`} />
        <Bar dataKey="total" fill="#ea701f" radius={[4, 4, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
