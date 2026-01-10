import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AnalyticsChart({ data }) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="font-bold mb-2">Performance</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#1f2937" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
