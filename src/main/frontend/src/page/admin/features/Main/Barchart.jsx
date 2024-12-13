import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Barchart = ({ data, dataKey, barKey }) => {
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={barKey} fill="#2B7CBC" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
