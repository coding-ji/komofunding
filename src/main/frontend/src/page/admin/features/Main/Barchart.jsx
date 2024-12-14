import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Barchart = ({ data = [], bars = [], dataKey, barKey, fillColor = "#256E91" }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* 다중 막대 렌더링 */}
        {bars.length > 0
          ? bars.map((bar, index) => (
              <Bar key={index} dataKey={bar.dataKey} fill={bar.color} />
            ))
          : // 단일 막대 렌더링
            barKey && <Bar dataKey={barKey} fill={fillColor} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
